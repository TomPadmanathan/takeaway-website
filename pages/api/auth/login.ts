// Packages
import sequelize from '@/database/sequelize';

// Database Models
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

    try {
        await sequelize.sync();
        const user = await User.findAll({
            where: {
                email: request.body.credentials.email,
                password: request.body.credentials.password,
            },
        });
        if (user.length === 0) {
            response.status(404);
            response.send('User not found');
            return;
        }
        response.send(user[0].dataValues);
    } catch (error: unknown) {
        console.error('Sequlize error:', error);
    }
}
