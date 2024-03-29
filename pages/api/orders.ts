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

    try {
        await sequelize.sync();

        const user: User | null = await User.findOne({
            where: {
                userId: userId,
            },
        });

        if (!user) {
            response.status(404).json({ error: 'User not found' });
            return;
        }
        if (user.userType != 'admin') {
            response.status(403).json({ error: 'Invalid permissions' });
            return;
        }
    } catch (error: unknown) {
        console.error('Sequlize error:', error);
    }

    try {
        await sequelize.sync();
        const orders: Order[] | void = await Order.findAll({
            include: [
                {
                    model: User,
                },
            ],
        });

        response.json({ orders: orders });
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
}
