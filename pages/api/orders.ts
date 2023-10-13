import type { NextApiRequest, NextApiResponse } from 'next';
import sequelize from '@/database/sequlize';
import Order from '@/database/models/Order';

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
        const order = await Order.findAll();

        response.send(order);
    } catch (error) {
        console.error('Sequlize error:', error);
    }
}
