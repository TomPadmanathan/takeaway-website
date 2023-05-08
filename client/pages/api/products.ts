import type { NextApiRequest, NextApiResponse } from 'next';
import Black from '@/assets/img/black.png';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200);
    res.send([
        {
            product: 'Chow Mein',
            price: 10.5,
            image: Black,
            category: ['popular', 'chinese'],
        },
        {
            product: 'Sweet and Sour Chicken',
            price: 10.5,
            image: Black,
            category: ['popular', 'chinese'],
        },
        {
            product: 'Sweet and Chili Chicken',
            price: 10.5,
            image: Black,
            category: ['popular', 'chinese'],
        },
        {
            product: 'Fried Rice',
            price: 6,
            image: Black,
            category: ['chinese'],
        },
        {
            product: 'Nasi Goreng',
            price: 6,
            image: Black,
            category: ['popular', 'chinese'],
        },
        {
            product: 'Mi Goreng',
            price: 6,
            image: Black,
            category: ['popular', 'chinese'],
        },
        {
            product: 'Pad Thai',
            price: 6,
            image: Black,
            category: ['popular', 'chinese'],
        },
    ]);
}
