import type { NextApiRequest, NextApiResponse } from 'next';
import Black from '@/assets/img/black.png';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200);
    res.send([
        {
            product: 'chow mein',
            price: 100.255,
            image: Black,
            category: ['popular', 'chinese'],
        },
        {
            product: 'sweet and sour chicken',
            price: 10.5,
            image: Black,
            category: ['popular', 'chinese'],
            options: [['rice', 'noodles']],
        },
        {
            product: 'sweet and chili chicken',
            price: 10.5,
            image: Black,
            category: ['popular', 'chinese'],
            options: [['rice', 'noodles']],
        },
        {
            product: 'fried rice',
            price: 6,
            image: Black,
            category: ['chinese'],
        },
        {
            product: 'nasi goreng',
            price: 6,
            image: Black,
            category: ['indonesian'],
        },
        {
            product: 'mi goreng',
            price: 6,
            image: Black,
            category: ['indonesian'],
        },
        {
            product: 'pad thai',
            price: 6,
            image: Black,
            category: ['popular', 'thai'],
        },
        {
            product: 'chicken katsu curry',
            price: 6,
            image: Black,
            category: ['popular', 'japanese'],
            options: [
                ['rice', 'noodles'],
                ['curry sauce on katsu', 'seperate curry sauce'],
            ],
        },
        {
            product: 'kimchi',
            price: 2,
            image: Black,
            category: ['korean'],
        },
        {
            product: 'yakisoba',
            price: 2,
            image: Black,
            category: ['japanese'],
        },
        {
            product: 'yakiudon',
            price: 2,
            image: Black,
            category: ['japanese'],
        },
    ]);
}
