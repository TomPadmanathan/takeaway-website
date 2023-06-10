import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({
    path: path.resolve(__dirname, '../../.env'),
});

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const calculateOrderAmount = (cart: any) => {
    return 1400;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { cart } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(cart),
        currency: 'gbp',
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
}
