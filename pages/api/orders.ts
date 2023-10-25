// Packages
import sequelize from '@/database/sequelize';

// Database Models
import Order from '@/database/models/Order';
import User from '@/database/models/User';

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
        const orders: Order[] | void = await Order.findAll({
            include: [
                {
                    model: User,
                    attributes: ['forename', 'surname', 'postcode'],
                },
            ],
        });

        response.send(orders);
    } catch (error) {
        response.send('Sequlize error');
        console.error('Sequlize error:', error);
    }
}
