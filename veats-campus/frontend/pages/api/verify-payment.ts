import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const secret = 'CDENQkeVYTGvLRQkvmJj6aNq';
        const hmac = crypto.createHmac('sha256', secret);

        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        const generated_signature = hmac.digest('hex');

        if (generated_signature === razorpay_signature) {
            res.status(200).json({ status: "ok", message: "Payment verified" });
        } else {
            res.status(400).json({ status: "error", message: "Invalid signature" });
        }
    } catch (error: any) {
        console.error("Payment Verification Error:", error);
        res.status(500).json({ error: error.message });
    }
}
