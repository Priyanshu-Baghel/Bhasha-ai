// routes/payment.js

const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY);
const User = require('../../models/Auth/userModel'); // Assuming User model is defined in models/User.js
const Contact = require("../../models/contact/contactModel");


const payment = async (req, res) => {
    const { subscription, userId } = req.body;
    console.log(subscription);

    const lineItems = subscription.map((sub) => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: sub.name
            },
            unit_amount: sub.price * 100, // assuming price is in lowest currency unit (e.g., paisa for INR)
        },
        quantity: 1
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.Base_URI}payment_success`,
            cancel_url: `${process.env.Base_URI}payment_failed`,
        });

        // Update user's subscription status in the database
       
        // Send session ID to client
        res.json({ id: session.id });
        

    } catch (error) {
        console.error("Error creating Stripe session:", error);
        res.status(500).json({ error: "Failed to initiate payment" });
    }
};



module.exports = payment;
