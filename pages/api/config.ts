import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    response.status(200);

    const siteConfig = {
        lowOrder: {
            maxFee: 5,
            feeLimit: 15,
        },
        delivery: {
            fee: 3,
        },
    };

    response.send(siteConfig);
}
