// Packages
import sequelize from '@/database/sequelize';

// Database Models
import User from '@/database/models/User';

import generateToken from '@/utils/JWT/generateToken';

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
        const user = await User.findOne({
            where: {
                email: request.body.credentials.email,
                password: request.body.credentials.password,
            },
        });
        if (!user) {
            response.status(404);
            response.send('User not found');
            return;
        }

        const token = generateToken(user);
        response.json({ token });
    } catch (error: unknown) {
        console.error('Sequlize error:', error);
        response.status(500).send('Internal Server Error');
    }
}
