// Packages
import Jwt, { JwtPayload } from 'jsonwebtoken';
import sequelize from '@/database/sequelize';

// Types/Interfaces
import type { NextApiRequest, NextApiResponse } from 'next';

// Database Models
import User from '@/database/models/User';
import Review from '@/database/models/Review';

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
): Promise<void> {
    response.status(200);
    if (request.method !== 'POST') {
        response.status(405).json({ error: 'Method not allowed' });
        return;
    }
    const authorizationHeader: string | undefined =
        request.headers.authorization;
    if (!authorizationHeader) {
        response
            .status(400)
            .json({ error: 'No token provided in the request' });
        return;
    }
    const token = authorizationHeader.replace('Bearer ', '');
    const decodedToken: JwtPayload | null | string = Jwt.decode(token);
    if (!decodedToken || typeof decodedToken != 'object') return;
    const userId = decodedToken.userId;

    try {
        await sequelize.sync();

        const user: User | null = await User.findOne({
            where: {
                userId: userId,
            },
            attributes: ['userId'],
        });

        if (!user) {
            response.status(400).json({ error: 'User not found' });
            return;
        }
        if (user.userId !== userId) {
            response.status(403).json({ error: 'Invalid Permissions' });
            return;
        }
        await Review.update(
            { status: request.body.status },
            {
                where: {
                    reviewId: request.body.reviewId,
                },
            }
        );
        response.json({});
    } catch (error: unknown) {
        response.status(500).json({ error: 'Sequlize error' });
        console.error('Sequlize error:', error);
    }
}
