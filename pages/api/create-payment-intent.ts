import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({
    path: path.resolve(__dirname, '../../.env'),
});
import calculateCheckoutPricesFromServerSide from '@/utils/calculateCheckoutPricesFromServerSide';

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const calculateOrderAmount = async (cart: any) => {
    let idOfElementsInCart: number[] = [];
    cart.forEach((element: any) => {
        idOfElementsInCart.push(element.id);
    });
    return (
        (await calculateCheckoutPricesFromServerSide(idOfElementsInCart)) * 100
    );
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { cart } = await req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: await calculateOrderAmount(cart),
        currency: 'gbp',
        payment_method_types: ['card'],
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
}
