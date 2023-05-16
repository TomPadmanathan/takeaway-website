import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const discountCodes = [
        { code: '5YKLmH4b', discount: 10 },
        { code: 'sdfsdf', discount: 20 },
    ];

    res.status(200);
    const response = {
        valid: discountCodes.find(discount => discount.code === req.body),
    };

    res.send(response);
}
