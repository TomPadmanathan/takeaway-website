// Packages
import sequelize from '@/database/sequelize';

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

        const credentials = request.body.credentials;

        const newUser: User = User.build({
            email: credentials.email,
            password: credentials.password,
            phoneNumber: credentials.phoneNumber,
            forename: credentials.forename,
            surname: credentials.surname,
            addressLine1: credentials.addressLine1,
            addressLine2: credentials.addressLine2,
            postcode: credentials.postcode,
            cityTown: credentials.cityTown,
        } as User);

        await newUser.save();
        const user: User = newUser.dataValues;
        const token = generateToken(user);
        response.json({ token });
    } catch (error: unknown) {
        console.error('Sequlize error:', error);
    }
}
