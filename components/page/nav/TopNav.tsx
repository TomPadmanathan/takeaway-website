// React/Next
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Types/Interfaces
import { NextRouter } from 'next/router';

// Assets
import Logo from '@/assets/img/logo.png';

const buttonStyles: string =
    'h-16 w-48 rounded-sm bg-lightergrey px-3 text-grey transition-all hover:bg-lightgrey hover:text-white mx-2';

export default function TopNav(): JSX.Element {
    const router: NextRouter = useRouter();

    const [token, setToken] = useState<string | null>();

    useEffect(() => {
        const token: string | null = localStorage.getItem('token');
        if (!token) return;
        setToken(token);
    }, [token]);

    return (
        <>
            <nav
                className="flex items-center justify-around bg-white py-4 m:mx-0 m:justify-around sm:hidden"
                id="topnav"
            >
                <button
                    className={buttonStyles}
                    // className="m-0 h-10 w-52 rounded border-[3px] border-blue px-10 font-bold text-pink sm:px-5"
                    onClick={(): Promise<boolean> => router.push('/order')}
                >
                    Order Now
                </button>
                <Image
                    src={Logo}
                    className="aspect-square w-40 hover:cursor-pointer"
                    alt={'site-icon'}
                    onClick={(): Promise<boolean> => router.push('/')}
                />

                {token ? (
                    <button
                        // className="m-0 h-10 w-60 rounded border-[3px] border-blue px-10 font-bold text-pink m:px-5"
                        className={buttonStyles}
                        onClick={(): Promise<boolean> =>
                            router.push('/account/')
                        }
                    >
                        Go to Account
                    </button>
                ) : (
                    <button
                        className={buttonStyles}
                        // className="m-0 h-10 w-60 rounded border-[3px] border-blue px-10 font-bold text-pink m:px-5"
                        onClick={(): Promise<boolean> =>
                            router.push('/auth/login/')
                        }
                    >
                        Login or Register
                    </button>
                )}
            </nav>
            <div className="h-[2px] w-screen bg-lightgrey"></div>
        </>
    );
}
