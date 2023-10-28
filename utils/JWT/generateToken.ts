// Packages
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

// Types/Interfaces
import User from '@/database/models/User';

export default function generateToken(user: User): string {
    interface payLoad {
        userId: string;
    }

    const payLoad: payLoad = {
        userId: user.userId,
    };

    // Create a JWT token with a secret key
    const token: string = jwt.sign(payLoad, uuidv4(), {
        expiresIn: '1h',
    });

    return token;
}
