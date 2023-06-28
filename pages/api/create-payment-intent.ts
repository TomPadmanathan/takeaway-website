import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({
    path: path.resolve(__dirname, '../../.env'),
});
import calculateCheckoutPricesFromServerSide from '@/utils/calculateCheckoutPricesFromServerSide';
import getIdsOfProductsInCart from '@/utils/getIdsOfProductsInCart';

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

async function calculateOrderAmount(cart: any) {
    return (
        (await calculateCheckoutPricesFromServerSide(
            getIdsOfProductsInCart(cart)
        )) * 100
    );
}

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    const { cart } = request.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: await calculateOrderAmount(cart),
        currency: 'gbp',
        payment_method_types: ['card'],
    });

    response.send({
        clientSecret: paymentIntent.client_secret,
    });
}
