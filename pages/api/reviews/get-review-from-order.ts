// Packages
import Jwt, { JwtPayload } from 'jsonwebtoken';
import sequelize from '@/database/sequelize';

// Types/Interfaces
import type { NextApiRequest, NextApiResponse } from 'next';

// Database Models
import User from '@/database/models/User';
import Order from '@/database/models/Order';
import Review from '@/database/models/Review';

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
    const authorizationHeader: string | undefined =
        request.headers.authorization;
    if (!authorizationHeader) {
        response
            .status(400)
            .json({ error: 'No token provided in the request' });
        console.error('No token provided in the request.');
        return;
    }
    const token = authorizationHeader.replace('Bearer ', '');
    const decodedToken: JwtPayload | null | string = Jwt.decode(token);
    if (!decodedToken || typeof decodedToken != 'object') return;
    const userId = decodedToken.userId;

    const { orderId } = request.query;

    try {
        await sequelize.sync();

        const review: Review | null = await Review.findOne({
            where: {
                orderId,
            },
            include: {
                model: Order,
                attributes: ['userId'],
            },
        });

        if (!review) {
            response.status(400).json({ error: 'review not found' });
            return;
        }
        if (review.order.userId != userId) {
            response.status(403).json({ error: 'Invalid Permissions' });
            return;
        }

        response.json({ review });
    } catch (error: unknown) {
        response.status(500).json({ error: 'Sequlize error' });
        console.error('Sequlize error:', error);
    }
}
