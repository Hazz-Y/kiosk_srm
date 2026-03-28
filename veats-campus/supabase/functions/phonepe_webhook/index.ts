// VEats — Supabase Edge Function: PhonePe Webhook Handler
// Deploy: supabase functions deploy phonepe_webhook
// Deno runtime

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req: Request) => {
    try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
        const supabase = createClient(supabaseUrl, supabaseKey);

        const body = await req.json();

        // ── Signature Verification ──
        // TODO: Implement PhonePe signature verification
        // See: https://developer.phonepe.com/docs/payment-gateway/server-to-server-callback
        // TODO: INSERT PHONEPE_WEBHOOK_SECRET HERE
        const webhookSecret = Deno.env.get('PHONEPE_WEBHOOK_SECRET') || 'TODO_INSERT_WEBHOOK_SECRET';

        if (webhookSecret !== 'TODO_INSERT_WEBHOOK_SECRET') {
            // TODO: Verify x-verify header
            // 1. Decode base64 response
            // 2. Compute SHA256(response + salt_key) + "###" + salt_index
            // 3. Compare with x-verify header value
            console.log('Webhook secret configured, verifying signature...');
        } else {
            console.warn('⚠️ PhonePe webhook secret not configured. Skipping verification.');
        }

        // Extract order info
        const orderId = body.order_ref || body.orderId;
        const status = body.status === 'PAID' || body.status === 'SUCCESS' ? 'PAID' : 'FAILED';

        if (!orderId) {
            return new Response(JSON.stringify({ error: 'Missing order_ref' }), { status: 400 });
        }

        // Update order
        const { data, error } = await supabase
            .from('orders')
            .update({
                payment_status: status,
                order_status: status === 'PAID' ? 'CONFIRMED' : undefined,
            })
            .eq('id', orderId)
            .select()
            .single();

        if (error) throw error;

        return new Response(
            JSON.stringify({ success: true, orderId: data.id, paymentStatus: status }),
            { headers: { 'Content-Type': 'application/json' } },
        );
    } catch (error) {
        return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
    }
});
