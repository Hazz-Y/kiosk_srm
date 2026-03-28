import type { NextApiRequest, NextApiResponse } from 'next';
import Razorpay from 'razorpay';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    try {
        const { amount, currency } = req.body;

        const razorpay = new Razorpay({
            key_id: 'rzp_test_SWNJRxZV1t5lWd',
            key_secret: 'CDENQkeVYTGvLRQkvmJj6aNq'
        });

        const options = {
            amount: amount, // in paise
            currency: currency || "INR",
            receipt: `receipt_${Math.floor(Math.random() * 10000)}`,
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (error: any) {
        console.error("Order Creation Error:", error);
        res.status(500).json({ error: error.message });
    }
}
