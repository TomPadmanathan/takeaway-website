// Packages
import Jwt, { JwtPayload } from 'jsonwebtoken';
import sequelize from '@/database/sequelize';
import Catering from '@/database/models/Catering';

// Types/Interfaces
import type { NextApiRequest, NextApiResponse, NextConfig } from 'next';
import { Optional } from 'sequelize';
import { NullishPropertiesOf } from 'sequelize/types/utils';

export const config: NextConfig = {
    api: {
        externalResolver: true,
    },
};

function getUserIdFromRequest(
    request: NextApiRequest,
    response: NextApiResponse
): string | void {
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) {
        response
            .status(404)
            .json({ error: 'No token provided in the request' });
        console.error('No token provided in the request.');
        return;
    }
    const token = authorizationHeader.replace('Bearer ', '');
    const decodedToken: JwtPayload | null | string = Jwt.decode(token);
    if (!decodedToken || typeof decodedToken != 'object') return;
    return decodedToken.userId;
}

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

    const userId = getUserIdFromRequest(request, response);
    if (!userId) return;

    const eventData = request.body.eventData;

    try {
        await sequelize.sync();
        const newCatering: Catering = Catering.build({
            userId: userId,
            eventType: eventData.eventType,
            estimatedDate: eventData.estimatedDate,
            dietaryRequirements: eventData.dietaryRequirements,
            estimatedAttendes: +eventData.estimatedAttendes,
        } as Optional<Catering, NullishPropertiesOf<Catering>>);

        await newCatering.save();
        response.json({});
    } catch (error) {
        console.error('Sequelize erorr: ', error);
        response.status(500).json({
            error: 'Internal Server Error',
        });
    }
}
