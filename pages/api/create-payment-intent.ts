import type { NextApiRequest, NextApiResponse } from 'next';
import calculateCheckoutPricesFromServerSide from '@/utils/calculateCheckoutPricesFromServerSide';
import {
    getIdOfElementsInCart,
    getIdsAndOptionsInCart,
} from '@/utils/getIdsOfProductsInCart';
import { cart } from '@/interfaces/cart';
import { checkoutUserInfomation } from '@/interfaces/checkoutUserInfomation';
import Stripe from 'stripe';

const stripe: Stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

async function calculateOrderAmount(cart: cart): Promise<number> {
    return (
        (await calculateCheckoutPricesFromServerSide(
            getIdOfElementsInCart(cart)
        )) * 100
    );
}

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
): Promise<void> {
    const cart: cart = request.body.cart;
    const userData: checkoutUserInfomation = JSON.parse(request.body.userData);

    const customer = await stripe.customers.create({
        email: userData.email,
        name: userData.name,
        phone: userData.phoneNumber.toString(),
        address: {
            city: userData.cityTown,
            line1: userData.addressLine1,
            line2: userData.addressLine2,
            postal_code: userData.postcode,
        },
        metadata: {
            orderNote: userData.orderNote,
            includeCutlery: userData.includeCutlery ? 1 : 0,
        },
    });

    const paymentIntent = await stripe.paymentIntents.create({
        amount: await calculateOrderAmount(cart),
        currency: 'gbp',
        payment_method_types: ['card'],
        metadata: {
            customerId: customer.id,
            cart: JSON.stringify(getIdsAndOptionsInCart(cart)),
        },
    });

    response.send({
        clientSecret: paymentIntent.client_secret,
    });
}
