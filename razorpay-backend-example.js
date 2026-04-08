// Example backend code (Node.js/Express) for Razorpay integration
// Save this as server.js or integrate into your backend

const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const app = express();
app.use(express.json());

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: 'YOUR_RAZORPAY_KEY_ID',
    key_secret: 'YOUR_RAZORPAY_KEY_SECRET'
});

// Create order endpoint
app.post('/create-order', async (req, res) => {
    try {
        const options = {
            amount: 100000, // ₹1000 in paisa
            currency: 'INR',
            receipt: 'receipt_' + Date.now(),
            payment_capture: 1
        };

        const order = await razorpay.orders.create(options);
        res.json({
            id: order.id,
            amount: order.amount,
            currency: order.currency
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Verify payment endpoint
app.post('/verify-payment', (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
        .createHmac('sha256', 'YOUR_RAZORPAY_KEY_SECRET')
        .update(sign.toString())
        .digest('hex');

    if (razorpay_signature === expectedSign) {
        // Payment verified successfully
        res.json({ success: true, message: 'Payment verified' });
    } else {
        res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});