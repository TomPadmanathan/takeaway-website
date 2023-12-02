// React/Next
import { useState, useEffect } from 'react';
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
import Password from '@/components/account/password';
import Address from '@/components/account/address';
import DeleteAccount from '@/components/account/deleteAccount';
import AccountDetails from '@/components/account/accountDetails';
import Orders from '@/components/account/orders';

// Assets
import {
    HiShoppingBag,
    HiUser,
    HiLocationMarker,
    HiLockClosed,
    HiLogout,
    HiTrash,
} from 'react-icons/hi';

export default function Account(): JSX.Element {
    const [user, setUser] = useState<User | null>();
    const [token, setToken] = useState<string>('');
    const router: NextRouter = useRouter();

    const [page, setPage] = useState<
        'password' | 'address' | 'accountDetails' | 'orders' | 'deleteAccount'
    >('accountDetails');

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
    }, []);

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
            onClick: (): void => setPage('accountDetails'),
            icon: HiUser,
        },
        {
            title: 'Address',
            onClick: (): void => setPage('address'),
            icon: HiLocationMarker,
        },
        {
            title: 'Password',
            onClick: (): void => setPage('password'),
            icon: HiLockClosed,
        },
        {
            title: 'Orders',
            onClick: (): void => setPage('orders'),
            icon: HiShoppingBag,
        },

        {
            title: 'Logout',
            onClick: logoutUser,
            icon: HiLogout,
        },
        {
            title: 'Delete my account',
            onClick: (): void => setPage('deleteAccount'),
            icon: HiTrash,
        },
    ];

    return (
        <>
            <BottomNav />
            {token && (
                <div className="mx-24 flex h-[85vh] items-center text-grey">
                    <nav className="w-fit rounded bg-white p-5 shadow-lg">
                        <h2 className="py-4 text-center text-3xl text-grey2">
                            My Account
                        </h2>
                        <ul>
                            {navItems.map((item: navItem) => (
                                <li
                                    className="my-2 flex justify-center"
                                    key={item.title}
                                >
                                    <button
                                        className="flex h-16 w-60 items-center justify-between bg-lightergrey pl-4 transition-all hover:bg-lightgrey hover:text-white"
                                        onClick={item.onClick}
                                    >
                                        <item.icon size={22} />
                                        <p className="ml-2 w-52 text-start">
                                            {item.title}
                                        </p>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <section className="ml-24 h-[70vh] w-screen overflow-y-auto rounded bg-white p-5 shadow-lg">
                        <>
                            {user && (
                                <>
                                    {page === 'accountDetails' && (
                                        <AccountDetails user={user} />
                                    )}
                                    {page === 'address' && (
                                        <Address user={user} />
                                    )}
                                    {page === 'password' && <Password />}
                                    {page === 'orders' && <Orders />}
                                </>
                            )}
                            {page === 'deleteAccount' && (
                                <DeleteAccount user={user} />
                            )}
                        </>
                    </section>
                </div>
            )}
            <Footer />
        </>
    );
}
