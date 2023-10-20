// React/Next
import { useState } from 'react';

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
    const [credentials, setCredentials] = useState<Credentials>({
        email: '',
        password: '',
    });

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        loginUser(credentials);
    }

    function loginUser(credentials: Credentials): void {
        fetch(process.env.NEXT_PUBLIC_URL + '/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                credentials,
            }),
        });
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
