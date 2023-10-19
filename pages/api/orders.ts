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
        const order: Order[] = await Order.findAll();

        response.send(order);
    } catch (error) {
        response.send('Sequlize error');
        console.error('Sequlize error:', error);
    }
}
