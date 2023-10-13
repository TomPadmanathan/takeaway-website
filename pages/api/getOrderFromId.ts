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

    await sequelize.sync();

    try {
        const order = await Order.findOne({
            where: {
                orderId: request.body.orderId,
            },
        });

        if (order) response.send(order);
        else console.error('Order not found');
    } catch (error) {
        console.error('Sequlize error:', error);
    }
}
