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

    await sequelize.sync();

    try {
        const user: User | null = await User.findOne({
            where: {
                userId: request.body.userId,
            },
        });

        if (!user) {
            console.error('User not found');
            response.status(404);
            return;
        }
        response.send(user);
    } catch (error) {
        console.error('Sequlize error:', error);
    }
}
