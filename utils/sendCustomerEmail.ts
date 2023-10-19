// Packages
import path from 'path';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';
import sequelize from '@/database/sequelize';

// Database Models
import Order from '@/database/models/Order';

dotenv.config({
    path: path.resolve(__dirname, '../../.env'),
});

export default async function sendCustomerEmail(
    orderId: number
): Promise<void> {
    const orderTypeCheck = await queryDatabase(orderId);
    if (!orderTypeCheck) {
        console.error('OrderId invalid');
        return;
    }
    const order: Order = orderTypeCheck;

    try {
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
            to: order.email,
            from: process.env.SENDGRID_SENDING_EMAIL,
            subject: '',
            html: '',
        };
        switch (order.status) {
            case 'pending':
                msg.subject = 'We have recived your order';
                msg.html = `<h1>Thank you for ordering</h1><h2>Your order is currently pending and you will recieve an order acceptance email shortly.</h2><p>Order Id: ${order.orderId}</p>`;
                break;
            case 'accepted':
                msg.subject = 'Your order has been accepted';
                msg.html = `<h1>Thank you for ordering</h1><h2>Your order has been accepted and you will recieve an email once your order has been dispatched.</h2><p>Order Id: ${order.orderId}</p>`;
                break;
            case 'dispatched':
                msg.subject = 'Your order has been dispatched';
                msg.html = `<h1>Thank you for ordering</h1><h2>Your order has been dispatched and your food will be with you shortly.</h2><p>Order Id: ${order.orderId}</p>`;
                break;
            case 'delivered':
                msg.subject = 'Your order has been delivered';
                msg.html = `<h1>Thank you for ordering</h1><h2>Your order has been delivered. Enjoy your meal!</h2><p>Order Id: ${order.orderId}</p>`;
                break;
            default:
                console.error('Order Status is not recognised');
                return;
        }

        await sgMail.send(msg);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

async function queryDatabase(orderId: number): Promise<Order | void | null> {
    await sequelize.sync();

    try {
        const order: Order | null = await Order.findOne({
            where: {
                orderId: orderId,
            },
        });
        return order;
    } catch (error) {
        console.error('Sequlize error:', error);
    }
    return;
}
