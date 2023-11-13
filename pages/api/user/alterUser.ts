// Packages
import sequelize from '@/database/sequelize';
import Jwt, { JwtPayload } from 'jsonwebtoken';

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

    const newInfo = request.body.newInfo;

    try {
        await sequelize.sync();
        const user = await User.update(
            {
                phoneNumber: newInfo.phoneNumber,
                email: newInfo.email,
                forename: newInfo.forename,
                surname: newInfo.surname,
                addressLine1: newInfo.addressLine1,
                addressLine2: newInfo.addressLine2,
                postcode: newInfo.postcode,
                cityTown: newInfo.cityTown,
            },
            {
                where: {
                    userId: userId,
                },
            }
        );
        if (user.length > 0) {
            const updatedUser = await User.findOne({
                where: {
                    userId: userId,
                },
                attributes: {
                    exclude: ['password'],
                },
            });
            response.json({
                user: updatedUser,
            });
        } else {
            console.error(
                'Updated user not found or no infomation has been changed'
            );
            response.status(404).json({
                error: 'Updated user not found or no infomation has been changed',
            });
            return;
        }
    } catch (error) {
        console.error('Sequlize error:', error);
    }
}
