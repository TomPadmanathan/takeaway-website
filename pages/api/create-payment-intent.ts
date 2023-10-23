// Packages
import Stripe from 'stripe';

// Utils
import calculateCheckoutPricesFromServerSide from '@/utils/calculateCheckoutPricesFromServerSide';
import {
    getIdOfElementsInCart,
    getIdsAndOptionsInCart,
} from '@/utils/getIdsOfProductsInCart';

// Types/Interfaces
import { cart } from '@/interfaces/cart';
import { checkoutInfoUser, checkoutInfoGuest } from '@/interfaces/checkoutInfo';
import type { NextApiRequest, NextApiResponse } from 'next';

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
    let userData: checkoutInfoUser | checkoutInfoGuest = JSON.parse(
        request.body.userData
    );
    let customer;
    switch (userData.userType) {
        case 'guest':
            customer = await stripe.customers.create({
                email: userData.email,
                name: userData.forename + ' ' + userData.surname,
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
                    userType: userData.userType,
                },
            });
            break;

        case 'user':
            customer = await stripe.customers.create({
                metadata: {
                    orderNote: userData.orderNote,
                    includeCutlery: userData.includeCutlery ? 1 : 0,
                    userId: userData.userId,
                    userType: userData.userType,
                },
            });
            break;

        default:
            console.error('Usertype not defined');
            return;
    }

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
