import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '@/interfaces/config';

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
            // mins
            estimatedTimeOffset: 45,
        },
    };

    response.send(siteConfig);
}
