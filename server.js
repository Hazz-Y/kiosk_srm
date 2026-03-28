const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Razorpay Instance
const razorpay = new Razorpay({
    key_id: 'rzp_test_SWNJRxZV1t5lWd',
    key_secret: 'CDENQkeVYTGvLRQkvmJj6aNq'
});

/**
 * Endpoint to create a new Razorpay Order
 * POST /create-order
 */
app.post('/create-order', async (req, res) => {
    try {
        const { amount, currency } = req.body;

        const options = {
            amount: amount, // in paise
            currency: currency || "INR",
            receipt: `receipt_order_${Math.floor(Math.random() * 1000)}`,
        };

        const order = await razorpay.orders.create(options);
        
        if (!order) {
            return res.status(500).send("Error creating order");
        }

        res.json(order);
    } catch (error) {
        console.error("Order Creation Error:", error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * Endpoint to verify Razorpay Payment Signature
 * POST /verify-payment
 */
app.post('/verify-payment', (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const secret = 'CDENQkeVYTGvLRQkvmJj6aNq';
    const hmac = crypto.createHmac('sha256', secret);

    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    if (generated_signature === razorpay_signature) {
        console.log("Payment Verified Successfully!");
        res.json({ status: "ok", message: "Payment verified successfully" });
    } else {
        console.error("Payment Verification Failed!");
        res.status(400).json({ status: "error", message: "Invalid signature" });
    }
});

// ============================
// FRONTEND SERVER (Port 8080)
// ============================
const frontendApp = express();
const FRONTEND_PORT = 8080;

// Serve static files from the current directory
frontendApp.use(express.static(__dirname));

frontendApp.listen(FRONTEND_PORT, () => {
    console.log(`✅ Frontend Kiosk UI serving at http://localhost:${FRONTEND_PORT}`);
});

// ============================
// BACKEND API (Port 3000)
// ============================
app.listen(PORT, () => {
    console.log(`✅ Backend API running at http://localhost:${PORT}`);
    console.log(`Key ID: rzp_test_SWNJRxZV1t5lWd (Active)`);
});
