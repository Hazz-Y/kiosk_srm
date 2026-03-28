// VEats — Supabase Edge Function: Settlement Job
// Deploy: supabase functions deploy settlement_job
// Can be triggered by a cron (Supabase Scheduled Functions) or manually
// Deno runtime

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req: Request) => {
    try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
        const supabase = createClient(supabaseUrl, supabaseKey);

        const { periodStart, periodEnd } = await req.json();

        // Get active vendors
        const { data: vendors, error: vendorErr } = await supabase
            .from('vendors')
            .select('*')
            .eq('status', 'ACTIVE');

        if (vendorErr) throw vendorErr;

        const results = [];

        for (const vendor of vendors || []) {
            // Sum sales for vendor in period
            const { data: orderItems, error: itemsErr } = await supabase
                .from('order_items')
                .select('*, orders!inner(*)')
                .eq('vendor_id', vendor.id)
                .eq('orders.payment_status', 'PAID')
                .gte('orders.created_at', periodStart)
                .lte('orders.created_at', periodEnd);

            if (itemsErr) throw itemsErr;

            const totalSales = (orderItems || []).reduce(
                (sum: number, item: any) => sum + item.item_price * item.quantity,
                0,
            );

            if (totalSales === 0) continue;

            const commission = Math.round(totalSales * vendor.commission_percent / 100 * 100) / 100;
            const payoutAmount = totalSales - commission;

            const { data: settlement, error: settErr } = await supabase
                .from('settlements')
                .insert({
                    vendor_id: vendor.id,
                    period_start: periodStart,
                    period_end: periodEnd,
                    total_sales: totalSales,
                    commission,
                    payout_amount: payoutAmount,
                    payout_status: 'PENDING',
                })
                .select()
                .single();

            if (settErr) throw settErr;
            results.push(settlement);
        }

        return new Response(
            JSON.stringify({ settlementsCreated: results.length, settlements: results }),
            { headers: { 'Content-Type': 'application/json' } },
        );
    } catch (error) {
        return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
    }
});
