// Packages
import Jwt, { JwtPayload } from 'jsonwebtoken';
import sequelize from '@/database/sequelize';

// Types/Interfaces
import type { NextApiRequest, NextApiResponse } from 'next';

// Database Models
import User from '@/database/models/User';
import Review from '@/database/models/Review';
import Order from '@/database/models/Order';

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
): Promise<void> {
    response.status(200);
    if (request.method !== 'GET') {
        response.status(405).json({ error: 'Method not allowed' });
        console.error('Method not allowed');
        return;
    }

    try {
        const reviews: Review[] = await Review.findAll({
            include: [
                {
                    model: Order,
                    attributes: ['userId'],
                    include: [
                        {
                            model: User,
                            attributes: ['forename', 'surname'],
                        },
                    ],
                },
            ],
        });

        response.json({ reviewRatings: [1, 2, 3, 4, 5], reviews: [{}, {}] });
    } catch (error: unknown) {
        response.status(500).json({ error: 'Sequlize error' });
        console.error('Sequlize error:', error);
    }
}
