// Packages
import sequelize from '@/database/sequelize';
import bcrypt from 'bcrypt';

// Database Models
import User from '@/database/models/User';

// Utils
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
        const user: User | null = await User.findOne({
            where: {
                email: request.body.credentials.email,
            },
        });
        if (!user) {
            response.status(404);
            response.send('User not found');
            return;
        }
        bcrypt.compare(
            request.body.credentials.password,
            user.password,
            (error: Error | undefined, result: boolean): void => {
                if (error) {
                    console.log('bcrypt error: ', error);
                    return;
                }
                if (result) {
                    const token = generateToken(user);
                    response.json({ token });
                    return;
                }
                console.error('Incorrect user/pass');
            }
        );
    } catch (error: unknown) {
        console.error('Sequlize error:', error);
        response.status(500).send('Internal Server Error');
    }
}
