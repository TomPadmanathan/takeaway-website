import type { NextApiRequest, NextApiResponse } from 'next';
import Order from '@/database/models/Order';
import sequelize from '@/database/sequelize';

export const config = {
    api: {
        externalResolver: true,
    },
};

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
): Promise<void> {
    response.status(200);

    if (!request.body.paymentIntent) {
        console.error('Stripe payment intent is not defined');
        return;
    }
    await sequelize.sync();

    try {
        const order = await Order.findOne({
            where: {
                stripePaymentId: request.body.paymentIntent,
            },
        });

        if (order) response.send(order);
        else console.error('Order not found');
    } catch (error) {
        console.error('Sequlize error:', error);
    }
}
