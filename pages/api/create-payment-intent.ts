// Packages
import Stripe from 'stripe';
import Jwt, { JwtPayload } from 'jsonwebtoken';

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

    const checkoutData: checkoutInfoGuest | checkoutInfoUser = JSON.parse(
        request.body.checkoutData
    );

    if (request.method !== 'POST') {
        response.status(405).json({ error: 'Method not allowed' });
        console.error('Method not allowed');
        return;
    }
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) {
        checkoutData.userType = 'guest';
    } else {
        const token = authorizationHeader.replace('Bearer ', '');
        const decodedToken: JwtPayload | null | string = Jwt.decode(token);
        if (!decodedToken || typeof decodedToken != 'object') return;
        checkoutData.userType = 'user';
        checkoutData.userId = decodedToken.userId;
    }

    let customer;
    switch (checkoutData.userType) {
        case 'guest':
            customer = await stripe.customers.create({
                email: checkoutData.email,
                name: checkoutData.forename + ' ' + checkoutData.surname,
                phone: checkoutData.phoneNumber.toString(),
                address: {
                    city: checkoutData.cityTown,
                    line1: checkoutData.addressLine1,
                    line2: checkoutData.addressLine2,
                    postal_code: checkoutData.postcode,
                },
                metadata: {
                    orderNote: checkoutData.orderNote,
                    includeCutlery: checkoutData.includeCutlery ? 1 : 0,
                    userType: checkoutData.userType,
                },
            });
            break;

        case 'user':
            customer = await stripe.customers.create({
                metadata: {
                    orderNote: checkoutData.orderNote,
                    includeCutlery: checkoutData.includeCutlery ? 1 : 0,
                    userType: checkoutData.userType,
                    userId: checkoutData.userId ? checkoutData.userId : null,
                },
            });
            break;

        default:
            console.error('Usertype not defined');
            return;
    }

    const paymentIntent: Stripe.Response<Stripe.PaymentIntent> =
        await stripe.paymentIntents.create({
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
