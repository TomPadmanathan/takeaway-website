// React/Next
import { useEffect, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';

// Utils
import getUrlFromQueryParams from '@/utils/getUrlFromQueryParams';

// Components
import BottomNav from '@/components/page/nav/BottomNav';
import Footer from '@/components/page/Footer';
import HighlightText from '@/components/HighlightText';

// Types/Interfaces
import { ChangeEvent } from 'react';

// Assets
import tailwindConfig from '@/tailwind.config';
import { IconContext } from 'react-icons';
import {
    HiMail,
    HiLockClosed,
    HiEye,
    HiEyeOff,
    HiPhone,
    HiUser,
    HiTruck,
    HiHome,
    HiLocationMarker,
} from 'react-icons/hi';

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

export default function SignUp(): JSX.Element {
    const tailwindColors: any = tailwindConfig?.theme?.colors;
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

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
        setLoading(true);
        signUpUser(credentials);
    }

    useEffect((): void => {
        const token: string | null = localStorage.getItem('token');
        if (token) router.push('/');
    }, []);

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
            interface responseJson {
                token?: string;
                error?: string;
            }
            const responseJson: responseJson = await response.json();
            setLoading(false);
            if (!response.ok) {
                setError(responseJson.error as string);
                return;
            }
            if (!responseJson.token) return;
            localStorage.setItem('token', responseJson.token);

            const URL = getUrlFromQueryParams(router);
            if (!URL) router.push('/');
            else router.push(URL);
        } catch {
            setError('Error creating user');
        }
    }

    const inputContainer: string =
        'my-4 flex items-center rounded-sm bg-lightergrey';
    const inputfield: string =
        'h-14 w-full bg-lightergrey pl-2 focus:outline-none';
    return (
        <IconContext.Provider
            value={{
                color: tailwindColors.grey,
                size: '22px',
            }}
        >
            <BottomNav />
            <div className="w- mx-10 mt-[-60px] flex h-screen items-center justify-center 2xs:mx-5">
                <form
                    className=" w-[500px] rounded-sm bg-white p-10 shadow-lg 2xs:px-2"
                    onSubmit={handleSubmit}
                >
                    <h1 className="pt-2 text-center text-2xl text-grey">
                        USER SIGN UP
                    </h1>
                    <div className="p-3">
                        <p className="mb-[-10px] text-center text-red">
                            <HighlightText color="red">{error}</HighlightText>
                        </p>
                        <div className={inputContainer}>
                            <HiMail className="ml-4" />
                            <input
                                type="email"
                                placeholder="Email"
                                className={inputfield}
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ): void => {
                                    const copy = {
                                        ...credentials,
                                    };
                                    copy.email = event.target.value;
                                    setCredentials(copy);
                                }}
                                required
                            />
                        </div>
                        <div className={inputContainer}>
                            <HiLockClosed className="ml-4" />

                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder="Password"
                                className={inputfield}
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ): void => {
                                    const copy = {
                                        ...credentials,
                                    };
                                    copy.password = event.target.value;
                                    setCredentials(copy);
                                }}
                                required
                            />

                            {passwordVisible ? (
                                <HiEyeOff
                                    className="mr-4 cursor-pointer"
                                    onClick={() =>
                                        setPasswordVisible(!passwordVisible)
                                    }
                                />
                            ) : (
                                <HiEye
                                    className="mr-4 cursor-pointer"
                                    onClick={() =>
                                        setPasswordVisible(!passwordVisible)
                                    }
                                />
                            )}
                        </div>

                        <div className={inputContainer}>
                            <HiPhone className="ml-4" />
                            <input
                                type="number"
                                placeholder="Phone Number"
                                className={inputfield}
                                id="phone-number"
                                required={true}
                                inputMode="numeric"
                                onKeyPress={(event: any): void => {
                                    if (!/[0-9]/.test(event.key))
                                        event.preventDefault();
                                }}
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ): void => {
                                    const copy = {
                                        ...credentials,
                                    };
                                    copy.phoneNumber = parseInt(
                                        event.target.value
                                    );
                                    setCredentials(copy);
                                }}
                            />
                        </div>

                        <div className={inputContainer}>
                            <div>
                                <HiUser className="ml-4" />
                            </div>
                            <input
                                className={
                                    'h-14 w-2/5 bg-lightergrey pl-2 focus:outline-none'
                                }
                                type="text"
                                placeholder="Forename"
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ): void => {
                                    const copy = { ...credentials };
                                    copy.forename = event.target.value;
                                    setCredentials(copy);
                                }}
                                required={true}
                            />
                            <div className="h-14 w-2 bg-white" />
                            <input
                                className={
                                    'ml-2 h-14 w-2/5 bg-lightergrey pl-2 focus:outline-none'
                                }
                                type="text"
                                placeholder="Surname"
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ): void => {
                                    const copy = { ...credentials };
                                    copy.surname = event.target.value;
                                    setCredentials(copy);
                                }}
                                required={true}
                            />
                        </div>

                        {/*  */}

                        <div className={inputContainer}>
                            <div>
                                <HiHome className="ml-4" />
                            </div>
                            <input
                                placeholder="Address line 1"
                                className="h-14 w-2/5 bg-lightergrey pl-2 focus:outline-none"
                                required={true}
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ): void => {
                                    const copy = { ...credentials };
                                    copy.addressLine1 = event.target.value;
                                    setCredentials(copy);
                                }}
                            />
                            <div className="h-14 w-2 bg-white" />
                            <input
                                className="ml-2 h-14 w-2/5 bg-lightergrey pl-2 focus:outline-none"
                                placeholder="Address line 2"
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ): void => {
                                    const copy = { ...credentials };
                                    copy.addressLine2 = event.target.value;
                                    setCredentials(copy);
                                }}
                            />
                        </div>

                        <div className={inputContainer}>
                            <HiTruck className="ml-4" />

                            <input
                                className={inputfield}
                                placeholder="Postcode"
                                value={credentials.postcode}
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ): void => {
                                    const copy = { ...credentials };
                                    copy.postcode =
                                        event.target.value.toUpperCase();
                                    setCredentials(copy);
                                }}
                            />
                        </div>
                        <div className={inputContainer}>
                            <HiLocationMarker className="ml-4" />

                            <input
                                className={inputfield}
                                placeholder="City/Town"
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ): void => {
                                    const copy = { ...credentials };
                                    copy.cityTown = event.target.value;
                                    setCredentials(copy);
                                }}
                            />
                        </div>

                        <button className="mb-2 flex h-14 w-full items-center justify-center rounded-sm border bg-grey py-1 tracking-wider text-white">
                            {loading ? 'LOADING' : 'SIGNUP'}
                        </button>
                        <h3
                            className="cursor-pointer text-grey"
                            onClick={(): void => {
                                const URL = getUrlFromQueryParams(router);
                                if (!URL) router.push('/auth/login');
                                else router.push('/auth/login?url=' + URL);
                            }}
                        >
                            Already have an account?{' '}
                            <HighlightText>Login</HighlightText>
                        </h3>
                    </div>
                </form>
            </div>
            <Footer />
        </IconContext.Provider>
    );
}
