// React/Next
import { useEffect, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';

// Utils
import isValidURL from '@/utils/isValidURL';

// Components
import PrimaryInput from '@/components/PrimaryInput';
import SecondaryButton from '@/components/SecondaryButton';

// Types/Interfaces
import { ChangeEvent } from 'react';

// Packages
import Jwt, { JwtPayload } from 'jsonwebtoken';

interface Credentials {
    email: string;
    password: string;
}

export default function Login(): JSX.Element {
    const router: NextRouter = useRouter();
    const [credentials, setCredentials] = useState<Credentials>({
        email: '',
        password: '',
    });
    const [token, setToken] = useState<string | undefined>();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        loginUser(credentials);
    }

    async function loginUser(credentials: Credentials): Promise<void> {
        try {
            const response: Response = await fetch(
                process.env.NEXT_PUBLIC_URL + '/api/auth/login',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        credentials,
                    }),
                }
            );
            interface responseJson {
                token?: string;
                error?: string;
            }
            const responseJson: responseJson = await response.json();
            if (!response.ok) {
                console.error(responseJson.error);
                return;
            }
            if (!responseJson.token) return;
            localStorage.setItem('token', responseJson.token);

            if (
                typeof router.query.url !== 'string' ||
                !isValidURL(router.query.url)
            ) {
                router.push('/');
                return;
            }
            router.push(router.query.url);
        } catch {
            console.error('Error fetching JWT');
        }
    }
    useEffect((): void => {
        const token: string | null = localStorage.getItem('token');
        if (token) setToken(token);
    });

    if (!token)
        return (
            <>
                <form onSubmit={handleSubmit}>
                    <PrimaryInput
                        type="email"
                        placeholder="Email"
                        onChange={(
                            event: ChangeEvent<HTMLInputElement>
                        ): void => {
                            const copy = {
                                ...credentials,
                            };
                            copy.email = event.target.value;
                            setCredentials(copy);
                        }}
                        required={true}
                    />
                    <PrimaryInput
                        placeholder="Password"
                        onChange={(
                            event: ChangeEvent<HTMLInputElement>
                        ): void => {
                            const copy = {
                                ...credentials,
                            };
                            copy.password = event.target.value;
                            setCredentials(copy);
                        }}
                        required={true}
                    />
                    <SecondaryButton content="login" />
                </form>
            </>
        );
    else
        return (
            <>
                <h1>You are already logged in.</h1>
                <SecondaryButton
                    content="Go to account"
                    onClick={(): void => {
                        const decodedToken: JwtPayload | null | string =
                            Jwt.decode(token);
                        if (!decodedToken || typeof decodedToken != 'object')
                            return;
                        router.push(`/users/${decodedToken.userId}`);
                    }}
                />
            </>
        );
}
