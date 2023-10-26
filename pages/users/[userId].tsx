// React/Next
import { useState, useEffect } from 'react';

// Database Models
import User from '@/database/models/User';

// Types/Interfaces
import fetchWithToken from '@/utils/JWT/fetchWithToken';

export default function OrderId(): JSX.Element {
    const [user, setUser] = useState<User>();

    // get user with token
    useEffect((): void => {
        async function fetchData(): Promise<void> {
            const response: Response = await fetchWithToken(
                process.env.NEXT_PUBLIC_URL + '/api/getUserFromToken',
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            const responseJson = await response.json();
            if (responseJson.error) {
                console.error(responseJson.error);
                return;
            }
            setUser(responseJson.user);
        }
        fetchData();
    }, []);

    useEffect(() => console.log(user), [user]);

    return <></>;
}
