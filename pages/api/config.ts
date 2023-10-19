// Types/Interfaces
import { config } from '@/interfaces/config';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
    request: NextApiRequest,
    response: NextApiResponse
): void {
    response.status(200);

    const siteConfig: config = {
        lowOrder: {
            maxFee: 5,
            feeLimit: 15,
        },
        delivery: {
            fee: 3,
            estimatedTimeOffset: 45, //mins
        },
    };

    response.send(siteConfig);
}
