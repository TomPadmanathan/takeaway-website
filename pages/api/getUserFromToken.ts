// Types/Interfaces
import type { NextApiRequest, NextApiResponse, NextConfig } from 'next';

// Database Models
import User from '@/database/models/User';

// Packages
import Jwt, { JwtPayload } from 'jsonwebtoken';
import sequelize from '@/database/sequelize';

export const config: NextConfig = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
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
    const token: string = authorizationHeader.replace('Bearer ', '');
    const decodedToken: JwtPayload | null | string = Jwt.decode(token);
    if (!decodedToken || typeof decodedToken != 'object') return;
    const userId: string = decodedToken.userId;

    try {
        await sequelize.sync();
        const user: User | null = await User.findOne({
            where: {
                userId: userId,
            },
            attributes: {
                exclude: ['password'],
            },
        });

        if (!user) {
            console.error('User not found');
            response.status(404);
            return;
        }
        response.json({
            user: user,
        });
    } catch (error) {
        console.error('Sequlize error:', error);
    }
}
