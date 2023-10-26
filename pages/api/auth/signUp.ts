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

        const credentials = request.body.credentials;

        // First param longer time hashing more sequre
        bcrypt.genSalt(10, (error: Error | undefined, salt: string): void => {
            if (error) {
                console.error('Bcrypt Error: ', error);
                return;
            }
            bcrypt.hash(
                credentials.password,
                salt,
                async (
                    error: Error | undefined,
                    hash: string
                ): Promise<void> => {
                    if (error) {
                        console.error('Bcrypt Error: ', error);
                        return;
                    }
                    const newUser: User = User.build({
                        email: credentials.email,
                        password: hash,
                        phoneNumber: credentials.phoneNumber,
                        forename: credentials.forename,
                        surname: credentials.surname,
                        addressLine1: credentials.addressLine1,
                        addressLine2: credentials.addressLine2,
                        postcode: credentials.postcode,
                        cityTown: credentials.cityTown,
                        userType: 'user',
                    } as User);

                    await newUser
                        .save()
                        .catch((error: Error): void =>
                            console.error('Sequlize error:', error)
                        );
                    const user: User = newUser.dataValues;
                    const token = generateToken(user);
                    response.json({ token });
                }
            );
        });
    } catch (error: unknown) {
        console.error('encription error: ', error);
    }
}
