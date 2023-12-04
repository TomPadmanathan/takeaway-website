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
    if (request.method !== 'POST') {
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
    const userId: string = decodedToken.userId;
    const orderId: string = request.body.orderId;
    try {
        await sequelize.sync();

        const order: Order | null = await Order.findOne({
            where: {
                orderId: orderId,
            },
            attributes: {
                include: ['userId'],
            },
        });
        if (!order) {
            response.status(400).json({ error: 'Invalid orderId' });
            return;
        }
        if (order.userId !== userId) {
            response.status(403).json({ error: 'Invalid permissions' });
            return;
        }

        const newReview = Review.build({
            orderId: orderId,
            rating: request.body.rating,
            message: request.body.ratingMessage,
        } as Review);

        await newReview.save();
        response.json({});
    } catch (error: unknown) {
        response.status(500).json({ error: 'Database Error' });
    }
}
