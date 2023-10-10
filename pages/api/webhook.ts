import { buffer } from 'micro';
import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';
import mysql, { Connection } from 'mysql2';
import sendCustomerEmail from '@/utils/sendCustomerEmail';

interface config {
    api: {
        bodyParser: boolean;
    };
}
interface stripeSession extends Stripe.Event.Data.Object {
    metadata?: any;
    id?: string;
    amount?: number;
}

export const config: config = {
    api: {
        bodyParser: false,
    },
};

const webhookHandler = async (
    request: NextApiRequest,
    response: NextApiResponse
): Promise<void> => {
    if (!process.env.STRIPE_PRIVATE_KEY) {
        console.error('Stripe private key undefined');
        return;
    }
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
        console.error('Stripe webhook key undefined');
        return;
    }
    const stripePrivateKey: string = process.env.STRIPE_PRIVATE_KEY;
    const stripeWebhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET;

    const stripe: Stripe = new Stripe(stripePrivateKey, {
        apiVersion: '2022-11-15',
    });

    if (request.method === 'POST') {
        const buf: Buffer = await buffer(request);
        if (!request.headers['stripe-signature']) {
            console.error('Signature undefined');
            return;
        }
        const signature: string | string[] =
            request.headers['stripe-signature'];

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

        if (event.type === 'payment_intent.succeeded') {
            const session: stripeSession = event.data.object;
            const customer: Stripe.Response<
                Stripe.Customer | Stripe.DeletedCustomer
            > = await stripe.customers.retrieve(session.metadata.customerId);
            createOrder(customer, session);
        }

        response.status(200).json({ received: true });
    } else {
        response.setHeader('Allow', 'POST');
        response.status(405).end('Method Not Allowed');
    }
};

function createOrder(customer: any, session: stripeSession): void {
    const connection: Connection = mysql.createConnection({
        host: process.env.dbHost,
        user: process.env.dbUser,
        password: process.env.dbPass,
        database: process.env.dbName,
    });
    const sql: string = `INSERT INTO orders (DateTime, Email, Name, PhoneNumber, CityTown, AddressLine1, AddressLine2, PostCode, OrderNote, StripeCustomerId, StripePaymentId, Products, TotalPayment) VALUES ('${new Date()
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')}', '${customer.email}', '${customer.name}', '${
        customer.phone
    }', '${customer.address.city}', '${customer.address.line1}', '${
        customer.address.line2
    }', '${customer.address.postal_code}', '${customer.metadata.orderNote}', '${
        session.metadata.customerId
    }', '${session.id}', '${session.metadata.cart}', '${session.amount}');`;
    connection.connect((err: mysql.QueryError | null): void => {
        if (err) throw err;
        connection.query(sql, (err: string, result: any): void => {
            if (err) throw err;
            sendCustomerEmail(result.insertId);
        });
    });
}
export default webhookHandler;
