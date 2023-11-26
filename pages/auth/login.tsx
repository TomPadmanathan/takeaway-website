// React/Next
import { useEffect, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';

// Utils
import isValidURL from '@/utils/isValidURL';

// Components
import SecondaryButton from '@/components/SecondaryButton';
import HighlightText from '@/components/HighlightText';
import BottomNav from '@/components/page/nav/BottomNav';
import Footer from '@/components/page/Footer';

// Types/Interfaces
import { ChangeEvent } from 'react';

// Packages
import { IconContext } from 'react-icons';

// Assets
import { HiMail, HiLockClosed, HiEye, HiEyeOff } from 'react-icons/hi';
import tailwindConfig from '@/tailwind.config';

interface Credentials {
    email: string;
    password: string;
}

export default function Login(): JSX.Element {
    const tailwindColors: any = tailwindConfig?.theme?.colors;
    const router: NextRouter = useRouter();
    const [credentials, setCredentials] = useState<Credentials>({
        email: '',
        password: '',
    });
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        setLoading(true);
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
            setLoading(false);
            if (!response.ok) {
                setError(responseJson.error as string);
                return;
            }

            // Redirect User
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
        if (token) router.push('/');
    }, []);

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
            <div className="mx-10 mt-[-60px] flex h-screen items-center justify-center 2xs:mx-5">
                <form
                    className="h-[400px] w-[500px] rounded-sm bg-white p-10 shadow-lg 2xs:px-2"
                    onSubmit={handleSubmit}
                >
                    <h1 className="pt-2 text-center text-2xl text-grey">
                        USER LOGIN
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
                        <button className="mb-2 flex h-14 w-full items-center justify-center rounded-sm border bg-grey py-1 tracking-wider text-white">
                            {loading ? 'LOADING' : 'LOGIN'}
                        </button>
                        <h3
                            className="cursor-pointer text-grey"
                            onClick={(): Promise<boolean> =>
                                router.push('/auth/signUp')
                            }
                        >
                            Not a user?{' '}
                            <HighlightText>Signup now</HighlightText>
                        </h3>
                    </div>
                </form>
            </div>
            <Footer />
        </IconContext.Provider>
    );
}
