// Packages
import sequelize from '@/database/sequelize';
import Jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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
    if (request.method !== 'POST') {
        response.status(405).json({ error: 'Method not allowed' });
        console.error('Method not allowed');
        return;
    }
    const authorizationHeader = request.headers.authorization;
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
    const requestUserId: string = decodedToken.userId;
    const userId = request.body.userId.userId;

    if (requestUserId != userId) {
        try {
            await sequelize.sync();
            const requestingUser: User | null = await User.findOne({
                where: {
                    userId: requestUserId,
                },
                attributes: {
                    include: ['userType'],
                },
            });

            if (!requestingUser) {
                console.error('Requesting user not found');
                response.status(404);
                return;
            }
            if (requestingUser.userType != 'admin') {
                response
                    .status(400)
                    .json({ error: 'User has invalid permissions' });
                return;
            }
        } catch (error) {
            console.error('Sequlize error:', error);
        }
    }

    try {
        await sequelize.sync();
        const currentUser = await User.findOne({
            where: {
                userId: userId,
            },
            attributes: {
                include: ['password'],
            },
        });
        if (!currentUser) {
            response.status(404).json({ error: 'User not found' });
            return;
        }
        bcrypt.compare(
            request.body.currentPassword,
            currentUser.password,
            (error: Error | undefined, result: boolean): void => {
                if (error) {
                    console.error('bcrypt error: ', error);
                    response.status(500).json({ error: 'Bcrypt Error' });
                    return;
                }
                if (result) {
                    bcrypt.genSalt(
                        10,
                        (error: Error | undefined, salt: string): void => {
                            if (error) {
                                console.error('Bcrypt Error: ', error);
                                response
                                    .status(500)
                                    .json({ error: 'Bcrypt Error' });
                                return;
                            }
                            bcrypt.hash(
                                request.body.newPassword,
                                salt,
                                async (
                                    error: Error | undefined,
                                    hash: string
                                ): Promise<void> => {
                                    if (error) {
                                        console.error('Bcrypt Error: ', error);
                                        response
                                            .status(500)
                                            .json({ error: 'Bcrypt Error' });
                                        return;
                                    }
                                    try {
                                        User.update(
                                            {
                                                password: hash,
                                            },
                                            {
                                                where: {
                                                    userId: userId,
                                                },
                                            }
                                        );
                                        response.json({});
                                    } catch (error) {
                                        console.error('Sequlize error:', error);
                                    }
                                }
                            );
                        }
                    );
                    return;
                }
                response.status(400).json({ error: 'Incorrect credentials' });
            }
        );
    } catch (error) {
        console.error('Sequlize error:', error);
    }
}
