// React/Next
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { NextRouter, useRouter } from 'next/router';
// Packages
import jwt from 'jsonwebtoken';

// Assets
import Logo from '@/assets/img/logo.png';

export default function Footer(): JSX.Element {
    const router: NextRouter = useRouter();

    const [token, setToken] = useState<string | null>();

    useEffect((): void => {
        const token = localStorage.getItem('token');
        if (!token) return;
        setToken(token);
    }, [token]);

    const footerItems: string[][][] = [
        [
            ['call us', `tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`],
            ['email us', `mailto:${process.env.NEXT_PUBLIC_EMAIL}`],
            ['leave us a review', '/account/orders/'],
        ],
        [
            ['order now', '/order/'],
            ['menu', '/menu/'],
            ['catering', '/#catering'],
        ],
        [
            ['my account', '/account/'],
            ['my orders', '/account/orders/'],
        ],
    ];

    return (
        <footer className=" bg-darkgrey px-96  2xl:px-64 xl:px-40 l:px-20">
            <div className="flex h-60 items-center justify-between m:block m:h-auto">
                <Image
                    src={Logo}
                    alt="logo"
                    className="aspect-4/3 w-40 invert filter 2xl:hidden"
                />
                {footerItems.map((titleGroup: string[][], index: number) => (
                    <ul key={index} className="w-64 2xl:py-10 m:w-full">
                        {titleGroup.map((title: string[]) => (
                            <li
                                onClick={() => router.push(title[1])}
                                className="cursor-pointer text-center text-white"
                                key={title[0]}
                            >
                                {title[0].toUpperCase()}
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
            <div className="h-0.5 bg-white" />
            <div className="flex h-20 items-center justify-center text-sm">
                <h2
                    className="cursor-pointer text-white"
                    onClick={(): Promise<boolean> =>
                        router.push('/privacy-policy')
                    }
                >
                    Privacy Policy
                </h2>
            </div>
        </footer>
    );
}
