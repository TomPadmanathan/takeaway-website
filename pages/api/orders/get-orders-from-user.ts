// Packages
import sequelize from '@/database/sequelize';
import Jwt, { JwtPayload } from 'jsonwebtoken';

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

    if (request.method !== 'GET') {
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
    const token = authorizationHeader.replace('Bearer ', '');
    const decodedToken: JwtPayload | null | string = Jwt.decode(token);
    if (!decodedToken || typeof decodedToken != 'object') return;
    const requestUserId: string = decodedToken.userId;

    try {
        await sequelize.sync();

        const orders: Order[] = await Order.findAll({
            where: {
                userId: requestUserId,
            },
        });
        response.json({ orders });
    } catch {
        response.status(500).json({ error: 'Internal Server Error' });
    }
}
