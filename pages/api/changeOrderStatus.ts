import { NextApiRequest, NextApiResponse } from 'next';
import sendCustomerEmail from '@/utils/sendCustomerEmail';
import sequelize from '@/database/sequelize';
import Order from '@/database/models/Order';

export const config = {
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
    } catch (error) {
        console.error('Sequlize error:', error);
    }
}
