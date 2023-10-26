// Packages
import path from 'path';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';
import sequelize from '@/database/sequelize';

// Database Models
import Order from '@/database/models/Order';
import User from '@/database/models/User';

dotenv.config({
    path: path.resolve(__dirname, '../../.env'),
});

export default async function sendCustomerEmail(
    orderId: string
): Promise<void> {
    const order: Order | null | void = await queryOrder(orderId);
    if (!order) {
        console.error('OrderId invalid');
        return;
    }
    const user: User | void | null = await queryUser(order.userId);
    if (!user) {
        console.error('UserId invalid');
        return;
    }

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
            to: user.email,
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

async function queryOrder(orderId: string): Promise<Order | void | null> {
    await sequelize.sync();

    try {
        const order: Order | null = await Order.findOne({
            where: {
                orderId: orderId,
            },
            attributes: ['orderId', 'status', 'userId'],
        });
        return order;
    } catch (error) {
        console.error('Sequlize error:', error);
    }
}
async function queryUser(userId: string): Promise<User | void | null> {
    await sequelize.sync();

    try {
        const user: User | null = await User.findOne({
            where: {
                userId: userId,
            },
            attributes: ['email'],
        });
        return user;
    } catch (error) {
        console.error('Sequlize error:', error);
    }
}
