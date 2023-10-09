import path from 'path';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';
import mysql, {
    Pool,
    OkPacket,
    FieldPacket,
    PoolConnection,
} from 'mysql2/promise';
import { products } from '@/interfaces/products';
import convertCompactedProducts from './convertCompactedProducts';

dotenv.config({
    path: path.resolve(__dirname, '../../.env'),
});

export default async function sendCustomerEmail(orderId: number) {
    try {
        const pool: Pool = mysql.createPool({
            host: process.env.dbHost!,
            user: process.env.dbUser!,
            password: process.env.dbPass!,
            database: process.env.dbName!,
        });

        // Get a connection from the pool
        const connection: PoolConnection = await pool.getConnection();

        // Define your SQL query to retrieve data
        const sql: string = `SELECT * FROM orders WHERE OrderId = ${orderId}`;

        // Execute the SQL query with the provided orderId
        const [rows]: [OkPacket, FieldPacket[]] = await connection.query(sql, [
            orderId,
        ]);

        // Release the connection back to the pool
        connection.release();

        const queryResult: any = rows;

        // Check if SENDGRID ENV's are defined in the environment
        if (!process.env.SENDGRID_API_KEY) {
            console.error('SENDGRID_API_KEY is not defined in the env.');
            return;
        }
        if (!process.env.SENDGRID_SENDING_EMAIL) {
            console.error('SENDGRID_SENDING_EMAIL is not defined in the env.');
            return;
        }
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        interface msg {
            to: string;
            from: string;
            subject: string;
            html: string;
            text?: string;
        }

        const msg: msg = {
            to: queryResult.Email,
            from: process.env.SENDGRID_SENDING_EMAIL,
            subject: 'Sending with SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: `<strong>Order Id: ${JSON.stringify(queryResult)}</strong>`,
        };
        if (queryResult.Status === 'pending') {
            const itemsOrdered: products = await convertCompactedProducts(
                queryResult.Products
            );
            msg.subject = 'We have recived your order';
            msg.html = `<h1>Thank you for ordering</h1><h2>Your order is currently pending and you will recieve an order acceptance email shortly.</h2><p>Order Id: ${queryResult.OrderId}</p><p>You have ordered:</p>`;
            console.log(itemsOrdered);
        }

        await sgMail.send(msg);
        console.log('Email sent');
    } catch (error) {
        console.error('Error:', error);
    }
}
