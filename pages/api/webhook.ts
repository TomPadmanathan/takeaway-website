import { buffer } from 'micro';
import Stripe from 'stripe';
import path from 'path';
import dotenv from 'dotenv';
import { NextApiRequest, NextApiResponse } from 'next';

dotenv.config({
    path: path.resolve(process.cwd(), '.env'),
});

const stripePrivateKey: any = process.env.STRIPE_PRIVATE_KEY;
const stripeWebhookSecret: any = process.env.STRIPE_WEBHOOK_SECRET;
const stripe = new Stripe(stripePrivateKey, {
    apiVersion: '2022-11-15',
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method === 'POST') {
        const buf = await buffer(request);
        const signature: any = request.headers['stripe-signature'];

        let event;

        try {
            event = stripe.webhooks.constructEvent(
                buf.toString(),
                signature,
                stripeWebhookSecret
            );
        } catch (err: any) {
            console.error(`Webhook error: ${err.message}`);
            return response.status(400).send(`Webhook Error: ${err.message}`);
        }

        // Handle specific event types
        if (event.type === 'payment_intent.succeeded') {
            const session: any = event.data.object;

            // Run your server-side code here
            // Access session information and perform necessary actions

            console.log('Checkout completed:', session);
        }

        response.status(200).json({ received: true });
    } else {
        response.setHeader('Allow', 'POST');
        response.status(405).end('Method Not Allowed');
    }
};
