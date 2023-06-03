import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200);

    const siteConfig = {
        lowOrder: {
            maxFee: 5,
            feeLimit: 15,
        },
        delivery: {
            fee: 3,
        },
    };

    res.send(siteConfig);
}
