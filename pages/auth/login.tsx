// React/Next
import { useState } from 'react';
import { NextRouter, useRouter } from 'next/router';

// Utils
import isValidURL from '@/utils/isValidURL';

// Components
import PrimaryInput from '@/components/PrimaryInput';
import SecondaryButton from '@/components/SecondaryButton';

// Types/Interfaces
import { ChangeEvent } from 'react';

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
            if (!response.ok) {
                console.error('Login failed');
                return;
            }
            const data = await response.json();
            localStorage.setItem('token', data.token);

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

    return (
        <>
            <form onSubmit={handleSubmit}>
                <PrimaryInput
                    type="email"
                    placeholder="Email"
                    onChange={(event: ChangeEvent<HTMLInputElement>): void => {
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
                    onChange={(event: ChangeEvent<HTMLInputElement>): void => {
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
}
