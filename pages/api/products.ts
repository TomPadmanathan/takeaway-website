// Types/Interfaces
import { products } from '@/interfaces/products';
import type { NextApiRequest, NextApiResponse } from 'next';

// Assets
import Black from '@/assets/img/black.png';
import ChowMein from '@/assets/img/products/chow-mein.png';
import SweetSourChicken from '@/assets/img/products/sweet-sour-chicken.png';
import SweetChilliChicken from '@/assets/img/products/sweet-chilli-chicken.png';
import FriedRice from '@/assets/img/products/fried-rice.png';
import NasiGoreng from '@/assets/img/products/nasi-goreng.png';
import MiGoreng from '@/assets/img/products/mi-goreng.png';
import PadThai from '@/assets/img/products/pad-thai.png';
import ChickenKatsuCurry from '@/assets/img/products/chicken-katsu-curry.png';
import Kimchi from '@/assets/img/products/kimchi.png';
import Yakisoba from '@/assets/img/products/yakisoba.png';
import Yakiudon from '@/assets/img/products/yakiudon.png';
import DimSum from '@/assets/img/products/dim-sum.png';

export default function handler(
    request: NextApiRequest,
    response: NextApiResponse
): void {
    const products: products = [
        {
            product: 'chow mein',
            price: 100.25,
            image: ChowMein,
            category: ['popular', 'chinese'],
            id: 1,
        },
        {
            product: 'dim sum',
            price: 100.25,
            image: DimSum,
            category: ['chinese'],
            id: 1,
        },
        {
            product: 'sweet and sour chicken',
            price: 10.5,
            image: SweetSourChicken,
            category: ['popular', 'chinese'],
            options: [['rice', 'noodles']],
            id: 2,
        },
        {
            product: 'sweet and chili chicken',
            price: 10.5,
            image: SweetChilliChicken,
            category: ['popular', 'chinese'],
            options: [['rice', 'noodles']],
            id: 3,
        },
        {
            product: 'fried rice',
            price: 6,
            image: FriedRice,
            category: ['chinese'],
            id: 4,
        },
        {
            product: 'nasi goreng',
            price: 6,
            image: NasiGoreng,
            category: ['indonesian'],
            id: 5,
        },
        {
            product: 'mi goreng',
            price: 6,
            image: MiGoreng,
            category: ['indonesian'],
            id: 6,
        },
        {
            product: 'pad thai',
            price: 6,
            image: PadThai,
            category: ['popular', 'thai'],
            id: 7,
        },
        {
            product: 'chicken katsu curry',
            price: 6,
            image: ChickenKatsuCurry,
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
            image: Kimchi,
            category: ['korean'],
            id: 9,
        },
        {
            product: 'yakisoba',
            price: 2,
            image: Yakisoba,
            category: ['japanese'],
            options: [['vegetable', 'chicken', 'pork', 'prawn', 'beef']],
            id: 10,
        },
        {
            product: 'yakiudon',
            price: 2,
            image: Yakiudon,
            category: ['japanese'],
            options: [['vegetable', 'chicken', 'pork', 'prawn', 'beef']],
            id: 11,
        },
    ];

    response.status(200);
    response.send(products);
}
