// VEats — Supabase Edge Function: Create Order & PhonePe Payment Request
// Deploy: supabase functions deploy create_order
// Deno runtime

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req: Request) => {
    try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
        const supabase = createClient(supabaseUrl, supabaseKey);

        const { userId, items, promoCode, promoDiscount } = await req.json();

        if (!items || items.length === 0) {
            return new Response(JSON.stringify({ error: 'Cart is empty' }), { status: 400 });
        }

        // Fetch menu items
        const menuItemIds = items.map((i: any) => i.menuItemId);
        const { data: menuItems, error: menuError } = await supabase
            .from('menu_items')
            .select('*, vendors(*)')
            .in_('id', menuItemIds);

        if (menuError) throw menuError;

        // Validate and compute totals
        let totalAmount = 0;
        const orderItemsData: any[] = [];

        for (const cartItem of items) {
            const mi = menuItems?.find((m: any) => m.id === cartItem.menuItemId);
            if (!mi) throw new Error(`Item ${cartItem.menuItemId} not found`);
            if (!mi.is_available) throw new Error(`${mi.name} is unavailable`);

            const lineTotal = mi.price * cartItem.quantity;
            totalAmount += lineTotal;
            orderItemsData.push({
                menu_item_id: mi.id,
                vendor_id: mi.vendor_id,
                quantity: cartItem.quantity,
                item_price: mi.price,
            });
        }

        const discount = promoDiscount || 0;
        const finalTotal = Math.max(0, totalAmount - discount);
        const pickupCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Create order
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                user_id: userId,
                total_amount: finalTotal,
                pickup_code: pickupCode,
                metadata: { promoCode, promoDiscount: discount },
            })
            .select()
            .single();

        if (orderError) throw orderError;

        // Create order items
        const items_with_order = orderItemsData.map((i) => ({ ...i, order_id: order.id }));
        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(items_with_order);

        if (itemsError) throw itemsError;

        // TODO: Initiate PhonePe payment
        // See: https://developer.phonepe.com/docs/payment-gateway/
        // TODO: INSERT PHONEPE_MID HERE
        const paymentPayload = {
            order_ref: order.id,
            amount: finalTotal,
            currency: 'INR',
            payment_token: `PHONEPE_STUB_${order.id}`,
            merchant_id: Deno.env.get('PHONEPE_MID') || 'TODO_INSERT_MERCHANT_ID',
        };

        return new Response(
            JSON.stringify({ order, pickupCode, qrContent: `${order.id}|${pickupCode}`, payment_payload: paymentPayload }),
            { headers: { 'Content-Type': 'application/json' }, status: 200 },
        );
    } catch (error) {
        return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
    }
});
