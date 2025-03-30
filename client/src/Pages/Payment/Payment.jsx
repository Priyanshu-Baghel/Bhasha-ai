// Payment.js

import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import CreditCard from './Credit Card/Credit';
import { useAuth } from '../../store/auth'; // Adjust the path as per your file structure
import SummaryApi from '../../Utils/Utils';

const Payment = () => {
    const { user } = useAuth(); // Access user data from AuthProvider context

    const subscription = [
        {
            name: "Basic",
            price: "500"
        }
    ];

    const makePayment = async () => {
        try {
            const stripe = await loadStripe("pk_test_51P8f34SCmH6DBPmDUC58D4UWvqlbo5iwyzwTgkuskMvEbjuCU19ZoVvlRKBP6q4953NL06TZZ53r3XscSvRR4msV00VelYQbSE");

            const res = await fetch(SummaryApi.payment.url, {
                method: SummaryApi.payment.method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Send token for authentication
                },
                body: JSON.stringify({
                    subscription,
                    userId: user._id // Assuming userId is available in user object from AuthProvider
                })
            });

            const session = await res.json();
            const result = stripe.redirectToCheckout({
                sessionId: session.id
            });

        } catch (error) {
            console.error("Error making payment:", error);
        }
    };

    return (
        <>
            <div className="flex flex-col lg:mt-4 lg:mb-16 items-center justify-center">
                <CreditCard />
                <button
                    onClick={makePayment}
                    type="button"
                    className="mt-8 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                    Payment
                </button>
            </div>
        </>
    );
};

export default Payment;
