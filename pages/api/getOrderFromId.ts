// Packages
import sequelize from '@/database/sequelize';
import Jwt, { JwtPayload } from 'jsonwebtoken';

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
    if (request.method !== 'POST') {
        response.status(405).json({ error: 'Method not allowed' });
        console.error('Method not allowed');
        return;
    }
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) {
        response
            .status(404)
            .json({ error: 'No token provided in the request' });
        console.error('No token provided in the request.');
        return;
    }
    const token: string = authorizationHeader.replace('Bearer ', '');
    const decodedToken: JwtPayload | null | string = Jwt.decode(token);
    if (!decodedToken || typeof decodedToken != 'object') return;
    const requestUserId: string = decodedToken.userId;

    try {
        await sequelize.sync();
        const order: Order | null = await Order.findOne({
            where: {
                orderId: request.body.orderId,
            },
            include: User,
        });

        if (!order) {
            response.status(404).json({ error: 'order not found' });
            return;
        }
        if (requestUserId !== order.userId) {
            try {
                await sequelize.sync();
                const requestUser: User | null = await User.findOne({
                    where: {
                        userId: requestUserId,
                    },
                    attributes: {
                        include: ['userType'],
                    },
                });
                if (!requestUser) {
                    response
                        .status(404)
                        .json({ error: 'requesting user not found' });
                    return;
                }
                if (requestUser.userType != 'admin') {
                    response
                        .status(400)
                        .json({ error: 'User has invalid permissions' });
                    return;
                }
            } catch (error) {
                console.error('Sequlize error:', error);
                response.status(500).json({
                    error: 'Database Error',
                });
            }
        }
        response.json({ order: order });
    } catch (error) {
        console.error('Sequlize error:', error);
        response.status(500).json({
            error: 'Database Error',
        });
    }
}
