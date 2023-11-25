// React/Next
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { NextRouter, useRouter } from 'next/router';

// Packages
import jwt from 'jsonwebtoken';

// Assets
import Logo from '@/assets/img/logo.png';

export default function TopNav(): JSX.Element {
    const router: NextRouter = useRouter();

    const [token, setToken] = useState<string | null>();
    const [userId, setUserId] = useState<string>();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;
        setToken(token);
        interface decodedToken {
            userId: string;
            iat: number;
            exp: number;
        }
        const decodedToken: any = jwt.decode(token);
        const userId = decodedToken.userId;
        setUserId(userId);
    }, [token]);

    return (
        <>
            <nav
                className="flex items-center justify-between bg-white px-32 py-4 m:mx-0 m:justify-around sm:hidden"
                id="topnav"
            >
                <button
                    className="m-0 h-10 w-52 rounded border-[3px] border-blue px-10 font-bold text-pink sm:px-5"
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
                        className="m-0 h-10 w-60 rounded border-[3px] border-blue px-10 font-bold text-pink m:px-5"
                        onClick={(): Promise<boolean> =>
                            router.push('/users/' + userId)
                        }
                    >
                        Go to Account
                    </button>
                ) : (
                    <button
                        className="m-0 h-10 w-60 rounded border-[3px] border-blue px-10 font-bold text-pink m:px-5"
                        onClick={(): Promise<boolean> =>
                            router.push('/auth/login')
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
