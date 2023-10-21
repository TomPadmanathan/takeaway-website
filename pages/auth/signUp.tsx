// React/Next
import { useEffect, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';

// Utils
import isValidURL from '@/utils/isValidURL';

// Components
import PrimaryInput from '@/components/PrimaryInput';
import SecondaryButton from '@/components/SecondaryButton';
import removeArrowsFromInput from '@/utils/removeArrowsFromInput';

// Types/Interfaces
import { ChangeEvent } from 'react';

interface Credentials {
    email: string;
    password: string;
    phoneNumber: number;
    forename: string;
    surname: string;
    addressLine1: string;
    addressLine2: string;
    postcode: string;
    cityTown: string;
}

export default function signUp(): JSX.Element {
    const router: NextRouter = useRouter();
    const [credentials, setCredentials] = useState<Credentials>({
        phoneNumber: 0,
        email: '',
        password: '',
        forename: '',
        surname: '',
        addressLine1: '',
        addressLine2: '',
        postcode: '',
        cityTown: '',
    });

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        signUpUser(credentials);
    }

    async function signUpUser(credentials: Credentials): Promise<void> {
        try {
            const response: Response = await fetch(
                process.env.NEXT_PUBLIC_URL + '/api/auth/signUp',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        credentials,
                    }),
                }
            );
            if (!response.ok) {
                console.error('Sign up failed');
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
            console.error('Error creating user');
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
                <PrimaryInput
                    type="number"
                    placeholder="Phone Number"
                    id="phone-number"
                    required={true}
                    inputMode="numeric"
                    onKeyPress={(event: any): void => {
                        if (!/[0-9]/.test(event.key)) event.preventDefault();
                    }}
                    onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                        const copy = {
                            ...credentials,
                        };
                        copy.phoneNumber = parseInt(event.target.value);
                        setCredentials(copy);
                    }}
                    addClass={removeArrowsFromInput}
                />
                <PrimaryInput
                    type="text"
                    placeholder="Forename"
                    onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                        const copy = { ...credentials };
                        copy.forename = event.target.value;
                        setCredentials(copy);
                    }}
                    required={true}
                />
                <PrimaryInput
                    type="text"
                    placeholder="Surname"
                    onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                        const copy = { ...credentials };
                        copy.surname = event.target.value;
                        setCredentials(copy);
                    }}
                    required={true}
                />
                <PrimaryInput
                    placeholder="Address line 1"
                    id="address-line-1"
                    required={true}
                    onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                        const copy = { ...credentials };
                        copy.addressLine1 = event.target.value;
                        setCredentials(copy);
                    }}
                />
                <PrimaryInput
                    placeholder="Address line 2 (optional)"
                    onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                        const copy = { ...credentials };
                        copy.addressLine2 = event.target.value;
                        setCredentials(copy);
                    }}
                />
                <PrimaryInput
                    placeholder="Postcode"
                    value={credentials.postcode}
                    onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                        const copy = { ...credentials };
                        copy.postcode = event.target.value.toUpperCase();
                        setCredentials(copy);
                    }}
                />
                <PrimaryInput
                    placeholder="City/Town"
                    onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                        const copy = { ...credentials };
                        copy.cityTown = event.target.value;
                        setCredentials(copy);
                    }}
                />
                <SecondaryButton content="Sign Up" />
            </form>
        </>
    );
}
