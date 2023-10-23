// Utils
import fetchWithToken from '@/utils/JWT/fetchWithToken';

// Packages
import Jwt from 'jsonwebtoken';

// Types/Interfaces
import User from '@/database/models/User';
import { Dispatch, SetStateAction } from 'react';
import { JwtPayload } from 'jsonwebtoken';

type tokenState = [string | null, Dispatch<SetStateAction<string | null>>];

export default async function getUserFromToken(
    token: tokenState
): Promise<User | void> {
    const [tokenState, setTokenState] = token;
    if (!tokenState) return;
    const decodedToken: JwtPayload | null | string = Jwt.decode(tokenState);
    if (!decodedToken || typeof decodedToken != 'object') return;
    const userId: string = decodedToken.userId;

    const response: Response = await fetchWithToken('/api/getUserFromId', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: userId,
        }),
    });
    const user = await response.json();
    if (!user) console.error('User Not found');
    return user;
}
