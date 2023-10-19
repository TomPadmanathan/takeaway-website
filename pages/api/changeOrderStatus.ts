// Packages
import sequelize from '@/database/sequelize';

// Database Models
import Order from '@/database/models/Order';

// Utils
import sendCustomerEmail from '@/utils/sendCustomerEmail';

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
        await Order.update(
            { status: request.body.status },
            {
                where: {
                    orderId: request.body.orderId,
                },
            }
        );

        sendCustomerEmail(request.body.orderId).catch(
            (emailError: string): void => {
                response.status(500).send('Email sending error: ' + emailError);
            }
        );
    } catch (error: unknown) {
        console.error('Sequlize error:', error);
    }
}
