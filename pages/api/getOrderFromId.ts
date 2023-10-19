// Packages
import sequelize from '@/database/sequelize';

// Database Models
import Order from '@/database/models/Order';

// Types/Interfaces
import type { NextApiRequest, NextApiResponse, NextConfig } from 'next';

export const config: NextConfig = {
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
        const order: Order | null = await Order.findOne({
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
