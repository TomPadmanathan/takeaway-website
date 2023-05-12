import type { NextApiRequest, NextApiResponse } from 'next';
import Black from '@/assets/img/black.png';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200);
    res.send([
        {
            product: 'Chow Mein',
            price: 100.255,
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
            category: ['indonesian'],
        },
        {
            product: 'Mi Goreng',
            price: 6,
            image: Black,
            category: ['indonesian'],
        },
        {
            product: 'Pad Thai',
            price: 6,
            image: Black,
            category: ['popular', 'thai'],
        },
        {
            product: 'Katsu Curry',
            price: 6,
            image: Black,
            category: ['popular', 'japanese'],
        },
        {
            product: 'Kimchi',
            price: 2,
            image: Black,
            category: ['korean'],
        },
        {
            product: 'YakiSoba',
            price: 2,
            image: Black,
            category: ['japanese'],
        },
        {
            product: 'YakiUdon',
            price: 2,
            image: Black,
            category: ['japanese'],
        },
    ]);
}
