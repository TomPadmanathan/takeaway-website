// React/Next
import React, { useState, useEffect } from 'react';
import { NextRouter, useRouter } from 'next/router';

// Database Models
import User from '@/database/models/User';

// Types/Interfaces
import fetchWithToken from '@/utils/JWT/fetchWithToken';
import { MouseEventHandler } from 'react';
import { IconType } from 'react-icons';

// Components
import BottomNav from '@/components/page/nav/BottomNav';
import Footer from '@/components/page/Footer';

// Assets
import {
    HiShoppingBag,
    HiUser,
    HiLocationMarker,
    HiLockClosed,
    HiLogout,
    HiTrash,
} from 'react-icons/hi';

interface props {
    component: React.ElementType;
}

export default function AccountLayout({ component }: props): JSX.Element {
    const [user, setUser] = useState<User | null>();
    const [token, setToken] = useState<string>('');
    const router: NextRouter = useRouter();

    useEffect((): void => {
        const token: string | null = localStorage.getItem('token');
        if (token) setToken(token);
    }, []);

    // get user with token
    useEffect((): void => {
        async function fetchData(): Promise<void> {
            const response: Response = await fetchWithToken(
                process.env.NEXT_PUBLIC_URL + `/api/getUserFromToken`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            const responseJson = await response.json();
            if (!response.ok) {
                if (response.status === 400) {
                    router.push(
                        '/auth/login?url=' +
                            process.env.NEXT_PUBLIC_URL +
                            '/account'
                    );
                }
                console.error(responseJson.error);
                return;
            }
            setUser(responseJson.user);
        }
        fetchData();
    }, [router]);

    return (
        <>
            <BottomNav />
            {token ? (
                <div className="flex h-[85vh] items-center justify-around text-grey l:block l:h-auto l:bg-white">
                    <AccountNav />
                    <section className="h-[70vh] w-2/3 overflow-y-auto rounded bg-white p-5 shadow-lg l:h-full l:w-screen 2xs:rounded-none">
                        {user && React.createElement(component, { user })}
                    </section>
                </div>
            ) : (
                <div className="h-[85vh]" />
            )}

            <Footer />
        </>
    );
}

function AccountNav(): JSX.Element {
    const router: NextRouter = useRouter();

    function logoutUser(): void {
        // Remove token validitaty from backend later
        localStorage.removeItem('token');
        router.push('/');
    }
    interface navItem {
        title: string;
        onClick: MouseEventHandler<HTMLButtonElement>;
        icon: IconType;
    }
    const navItems: navItem[] = [
        {
            title: 'Account details',
            onClick: (): Promise<boolean> =>
                router.push('/account/account-details'),
            icon: HiUser,
        },
        {
            title: 'Address',
            onClick: (): Promise<boolean> => router.push('/account/address'),
            icon: HiLocationMarker,
        },
        {
            title: 'Password',
            onClick: (): Promise<boolean> => router.push('/account/password'),
            icon: HiLockClosed,
        },
        {
            title: 'Orders',
            onClick: (): Promise<boolean> => router.push('/account/orders'),
            icon: HiShoppingBag,
        },

        {
            title: 'Logout',
            onClick: logoutUser,
            icon: HiLogout,
        },
        {
            title: 'Delete my account',
            onClick: (): Promise<boolean> =>
                router.push('/account/delete-account'),
            icon: HiTrash,
        },
    ];
    return (
        <nav className="rounded bg-white p-5 shadow-lg l:w-screen">
            <div className=" mx-10 justify-between l:hidden">
                <h2 className="py-4 text-center text-3xl text-grey2">
                    My Account
                </h2>
            </div>

            <ul
                className={
                    'l:grid l:grid-cols-3 l:place-items-center ms:grid-cols-2 xs:grid-cols-1'
                }
            >
                {navItems.map((item: navItem) => (
                    <li
                        className="my-2 flex w-min justify-center"
                        key={item.title}
                    >
                        <button
                            className="flex h-16 w-min items-center justify-between bg-lightergrey pl-4 transition-all hover:bg-lightgrey hover:text-white"
                            onClick={item.onClick}
                        >
                            <item.icon size={22} />
                            <p className="ml-2 w-52 text-start">{item.title}</p>
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
