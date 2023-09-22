import path from 'path';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';
import mysql, { Pool, OkPacket, FieldPacket } from 'mysql2/promise';

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
        const connection = await pool.getConnection();

        // Define your SQL query to retrieve data
        const sql = `SELECT * FROM orders WHERE OrderId = ${orderId}`;

        // Execute the SQL query with the provided orderId
        const [rows]: [OkPacket, FieldPacket[]] = await connection.query(sql, [
            orderId,
        ]);

        // Release the connection back to the pool
        connection.release();

        const queryResult: any = rows; // The result is an OkPacket

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

        const msg = {
            to: queryResult.Email,
            from: process.env.SENDGRID_SENDING_EMAIL,
            subject: 'Sending with SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: `<strong>Order Id: ${JSON.stringify(queryResult)}</strong>`,
        };

        await sgMail.send(msg);
        console.log('Email sent');
    } catch (error) {
        console.error('Error:', error);
    }
}
