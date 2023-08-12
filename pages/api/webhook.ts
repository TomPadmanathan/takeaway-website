import { buffer } from 'micro';
import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';
const stripePrivateKey: any = process.env.STRIPE_PRIVATE_KEY;
const stripeWebhookSecret: any = process.env.STRIPE_WEBHOOK_SECRET;
const stripe = new Stripe(stripePrivateKey, {
    apiVersion: '2022-11-15',
});
import mysql, { Connection } from 'mysql2';

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
        const buf: Buffer = await buffer(request);
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

        interface stripeSession extends Stripe.Event.Data.Object {
            metadata?: any;
        }

        if (event.type === 'payment_intent.succeeded') {
            const session: stripeSession = event.data.object;

            // const customer: Stripe.Response<
            //     Stripe.Customer | Stripe.DeletedCustomer
            // > = await stripe.customers.retrieve(session.metadata);
            createOrder();
        }

        response.status(200).json({ received: true });
    } else {
        response.setHeader('Allow', 'POST');
        response.status(405).end('Method Not Allowed');
    }
};

function createOrder() {
    const connection: Connection = mysql.createConnection({
        host: process.env.dbHost,
        user: process.env.dbUser,
        password: process.env.dbPass,
        database: process.env.dbName,
    });
    const insertStatement: string = `INSERT INTO orders (DateTime, Email, Name, PhoneNumber, CityTown, AddressLine1, AddressLine2, PostCode, OrderNote, StripeCustomerId, Products) VALUES ('${new Date()
        .toISOString()
        .slice(0, 19)
        .replace(
            'T',
            ' '
        )}', 'example22222@email.com', 'John Doe', '1234567890', 'City', '123 Main St', '', '12345', 'Note', 'stripe123', 'Product List');`;
    connection.connect((err: mysql.QueryError | null) => {
        if (err) throw err;
        connection.query(insertStatement, err => {
            if (err) throw err;
        });
    });
}
