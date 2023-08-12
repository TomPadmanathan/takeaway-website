import type { NextApiRequest, NextApiResponse } from 'next';
import { products } from '@/interfaces/products';
import Black from '@/assets/img/black.png';

export default function handler(
    request: NextApiRequest,
    response: NextApiResponse
): void {
    const products: products = [
        {
            product: 'chow mein',
            price: 100.25,
            image: Black,
            category: ['popular', 'chinese'],
            id: 1,
        },
        {
            product: 'sweet and sour chicken',
            price: 10.5,
            image: Black,
            category: ['popular', 'chinese'],
            options: [['rice', 'noodles']],
            id: 2,
        },
        {
            product: 'sweet and chili chicken',
            price: 10.5,
            image: Black,
            category: ['popular', 'chinese'],
            options: [['rice', 'noodles']],
            id: 3,
        },
        {
            product: 'fried rice',
            price: 6,
            image: Black,
            category: ['chinese'],
            id: 4,
        },
        {
            product: 'nasi goreng',
            price: 6,
            image: Black,
            category: ['indonesian'],
            id: 5,
        },
        {
            product: 'mi goreng',
            price: 6,
            image: Black,
            category: ['indonesian'],
            id: 6,
        },
        {
            product: 'pad thai',
            price: 6,
            image: Black,
            category: ['popular', 'thai'],
            id: 7,
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
            id: 8,
        },
        {
            product: 'kimchi',
            price: 2,
            image: Black,
            category: ['korean'],
            id: 9,
        },
        {
            product: 'yakisoba',
            price: 2,
            image: Black,
            category: ['japanese'],
            id: 10,
        },
        {
            product: 'yakiudon',
            price: 2,
            image: Black,
            category: ['japanese'],
            id: 11,
        },
    ];

    response.status(200);
    response.send(products);
}
