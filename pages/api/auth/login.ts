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
            response.status(404).json({ error: 'User not found' });
            return;
        }
        bcrypt.compare(
            request.body.credentials.password,
            user.password,
            (error: Error | undefined, result: boolean): void => {
                if (error) {
                    console.error('bcrypt error: ', error);
                    return;
                }
                if (result) {
                    const token: string = generateToken(user);
                    response.json({ token: token });
                    return;
                }
                response.status(400).json({ error: 'Incorrect credentials' });
            }
        );
    } catch (error: unknown) {
        console.error('Sequlize error:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
}
