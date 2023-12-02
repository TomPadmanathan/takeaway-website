// Packages
import sequelize from '@/database/sequelize';
import Jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Database Models
import User from '@/database/models/User';
import Order from '@/database/models/Order';
import Catering from '@/database/models/Catering';

// Types/Interfaces
import type { NextApiRequest, NextApiResponse, NextConfig } from 'next';

export const config: NextConfig = {
    api: {
        externalResolver: true,
    },
};

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// User Model
User.hasMany(Catering, { foreignKey: 'userId', onDelete: 'CASCADE' });
Catering.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
): Promise<void> {
    response.status(200);
    if (request.method !== 'POST') {
        response.status(405).json({ error: 'Method not allowed' });
        return;
    }
    const authorizationHeader: string | undefined =
        request.headers.authorization;
    if (!authorizationHeader) {
        response
            .status(400)
            .json({ error: 'No token provided in the request' });
        return;
    }
    const token: string = authorizationHeader.replace('Bearer ', '');
    const decodedToken: JwtPayload | null | string = Jwt.decode(token);
    if (!decodedToken || typeof decodedToken != 'object') return;
    const requestUserId: string = decodedToken.userId;
    const userPassword: string = request.body.password;

    try {
        await sequelize.sync();

        // Update later to delete other tables user data
        const user: User | null = await User.findByPk(requestUserId, {
            include: [Order, Catering],
        });

        if (!user) {
            response.status(404).json({ error: 'User not found' });
            return;
        }

        bcrypt.compare(
            userPassword,
            user.password,
            async (
                error: Error | undefined,
                result: boolean
            ): Promise<void> => {
                if (error) {
                    response
                        .status(500)
                        .json({ error: 'Error Checking Password' });
                    return;
                }
                if (result) {
                    try {
                        await user.destroy();
                        response.json({});
                    } catch (error) {
                        console.error(error);

                        response.status(500).json({
                            error: 'Error deleting account',
                        });
                    }
                    return;
                }

                response.status(400).json({ error: 'Incorrect credentials' });
            }
        );
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
}
