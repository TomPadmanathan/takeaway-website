import { buffer } from 'micro';
import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';
const stripePrivateKey: any = process.env.STRIPE_PRIVATE_KEY;
const stripeWebhookSecret: any = process.env.STRIPE_WEBHOOK_SECRET;
const stripe = new Stripe(stripePrivateKey, {
    apiVersion: '2022-11-15',
});

interface config {
    api: {
        bodyParser: boolean;
    };
}

export const config: config = {
    api: {
        bodyParser: false,
    },
};

export default async (
    request: NextApiRequest,
    response: NextApiResponse
): Promise<void> => {
    if (request.method === 'POST') {
        const buf = await buffer(request);
        const signature: any = request.headers['stripe-signature'];

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(
                buf.toString(),
                signature,
                stripeWebhookSecret
            );
        } catch (error: any) {
            console.error(`Webhook error: ${error.message}`);
            return response.status(400).send(`Webhook Error: ${error.message}`);
        }

        // Handle specific event types
        if (event.type === 'payment_intent.succeeded') {
            const session: any = event.data.object;

            // Run your server-side code here
            // Access session information and perform necessary actions

            // console.log('Webhook:', session);
            console.log('Webhook:', JSON.parse(session.metadata.cart));

            const customer = await stripe.customers.retrieve(
                session.metadata.customerId
            );
            // console.log(customer);
        }

        response.status(200).json({ received: true });
    } else {
        response.setHeader('Allow', 'POST');
        response.status(405).end('Method Not Allowed');
    }
};
