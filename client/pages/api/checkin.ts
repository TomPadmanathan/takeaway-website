import type { NextApiRequest, NextApiResponse } from 'next';
import { Array } from '@/interfaces/checkin';

const myStrings: Array = [
    { name: 'Tom', checkedIn: true },
    { name: 'Jim', checkedIn: false },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(myStrings);
}
