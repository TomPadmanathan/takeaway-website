// React/Next
import { useState, useEffect } from 'react';
import { NextRouter, useRouter } from 'next/router';

// Database Models
import User from '@/database/models/User';

// Types/Interfaces
import fetchWithToken from '@/utils/JWT/fetchWithToken';
import { ChangeEvent, MouseEventHandler, FormEvent } from 'react';
import { IconType } from 'react-icons';

// Components
import SecondaryButton from '@/components/SecondaryButton';
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
    HiMail,
    HiPhone,
    HiTruck,
    HiHome,
} from 'react-icons/hi';

export default function Account(): JSX.Element {
    const [user, setUser] = useState<User | null>();
    const [token, setToken] = useState<string>('');
    const router: NextRouter = useRouter();

    const [yourInfo, setYourInfo] = useState<any>();
    const [address, setAddress] = useState<any>();

    interface password {
        currentPassword: string;
        newPassword: string;
        comfirmNewPassword: string;
    }

    const emptyPassword = {
        currentPassword: '',
        newPassword: '',
        comfirmNewPassword: '',
    };
    const [password, setPassword] = useState<password>(emptyPassword);
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

    useEffect((): void => {
        setYourInfo(user);
        setAddress(user);
    }, [user]);

    async function updatePassword(): Promise<void> {
        if (password.newPassword != password.comfirmNewPassword) {
            console.error('New passwords dont match');
            return;
        }
        const response: Response = await fetchWithToken(
            process.env.NEXT_PUBLIC_URL + `/api/user/updateUserPassword`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    currentPassword: password.currentPassword,
                    newPassword: password.newPassword,
                }),
            }
        );
        const responseJson = await response.json();
        if (!response.ok) {
            console.error(responseJson.error);
            return;
        }
        setPassword(emptyPassword);
    }

    async function updateUserInfo(
        updateType: 'yourInfo' | 'address'
    ): Promise<void> {
        const response: Response = await fetchWithToken(
            process.env.NEXT_PUBLIC_URL + `/api/user/alterUser`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    newInfo: updateType === 'yourInfo' ? yourInfo : address,
                    userId: router.query,
                }),
            }
        );
        const responseJson = await response.json();
        if (!response.ok) {
            console.error(responseJson.error);
            return;
        }
        setUser(responseJson.user);
    }

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

    const inputContainer: string =
        'my-4 3xs:my-2 flex items-center rounded-sm bg-lightergrey';
    const inputfield: string =
        'h-14 w-full bg-lightergrey pl-2 focus:outline-none';

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
                                <li className="my-2 flex justify-center">
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
                    <section className="ml-24 h-[70vh] w-screen rounded bg-white p-5 shadow-lg">
                        {!yourInfo ? (
                            <h1>loading</h1>
                        ) : (
                            <>
                                {page === 'accountDetails' && (
                                    <>
                                        <h1 className="py-5 text-3xl text-grey2">
                                            Account Details
                                        </h1>
                                        <form
                                            onSubmit={(
                                                event: FormEvent<HTMLFormElement>
                                            ) => {
                                                event.preventDefault();
                                                updateUserInfo('yourInfo');
                                            }}
                                        >
                                            <div className={inputContainer}>
                                                <HiMail
                                                    className="ml-4"
                                                    size={22}
                                                />
                                                <input
                                                    type="email"
                                                    placeholder="Email"
                                                    className={inputfield}
                                                    onChange={(
                                                        event: ChangeEvent<HTMLInputElement>
                                                    ): void => {
                                                        const copy = {
                                                            ...yourInfo,
                                                        };
                                                        copy.email =
                                                            event.target.value;
                                                        setYourInfo(copy);
                                                    }}
                                                    value={yourInfo.email}
                                                />
                                            </div>

                                            <div className={inputContainer}>
                                                <HiPhone
                                                    className="ml-4"
                                                    size={22}
                                                />
                                                <input
                                                    type="number"
                                                    placeholder="Phone Number"
                                                    className={inputfield}
                                                    id="phone-number"
                                                    inputMode="numeric"
                                                    onKeyPress={(
                                                        event: any
                                                    ): void => {
                                                        if (
                                                            !/[0-9]/.test(
                                                                event.key
                                                            )
                                                        )
                                                            event.preventDefault();
                                                    }}
                                                    onChange={(
                                                        event: ChangeEvent<HTMLInputElement>
                                                    ): void => {
                                                        const copy = {
                                                            ...yourInfo,
                                                        };
                                                        copy.phoneNumber =
                                                            event.target.value;
                                                        setYourInfo(copy);
                                                    }}
                                                    value={yourInfo.phoneNumber}
                                                />
                                            </div>

                                            <div className={inputContainer}>
                                                <HiUser
                                                    className="ml-4"
                                                    size={22}
                                                />
                                                <input
                                                    className={
                                                        'h-14 w-2/5 bg-lightergrey pl-2 focus:outline-none'
                                                    }
                                                    type="text"
                                                    placeholder="Forename"
                                                    onChange={(
                                                        event: ChangeEvent<HTMLInputElement>
                                                    ): void => {
                                                        const copy = {
                                                            ...yourInfo,
                                                        };
                                                        copy.forename =
                                                            event.target.value;
                                                        setYourInfo(copy);
                                                    }}
                                                    value={yourInfo.forename}
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
                                                        const copy = {
                                                            ...yourInfo,
                                                        };
                                                        copy.surname =
                                                            event.target.value;
                                                        setYourInfo(copy);
                                                    }}
                                                    value={yourInfo.surname}
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="h-16 rounded-sm bg-lightergrey px-3 text-grey transition-all hover:bg-lightgrey hover:text-white"
                                            >
                                                Update my details
                                            </button>
                                        </form>
                                    </>
                                )}
                                {page === 'address' && (
                                    <>
                                        <h1 className="py-5 text-3xl text-grey2">
                                            Address
                                        </h1>
                                        <form
                                            onSubmit={(
                                                event: FormEvent<HTMLFormElement>
                                            ) => {
                                                event.preventDefault();
                                                updateUserInfo('yourInfo');
                                            }}
                                        >
                                            <div className={inputContainer}>
                                                <HiHome className="ml-4" />
                                                <input
                                                    placeholder="Address line 1"
                                                    className="h-14 w-2/5 bg-lightergrey pl-2 focus:outline-none"
                                                    onChange={(
                                                        event: ChangeEvent<HTMLInputElement>
                                                    ): void => {
                                                        const copy = {
                                                            ...address,
                                                        };
                                                        copy.addressLine1 =
                                                            event.target.value;
                                                        setAddress(copy);
                                                    }}
                                                    value={address.addressLine1}
                                                />
                                                <div className="h-14 w-2 bg-white" />
                                                <input
                                                    className="ml-2 mr-0 h-14 w-2/5 bg-lightergrey pl-2 focus:outline-none"
                                                    placeholder="Address line 2 (optional)"
                                                    onChange={(
                                                        event: ChangeEvent<HTMLInputElement>
                                                    ): void => {
                                                        const copy = {
                                                            ...address,
                                                        };
                                                        copy.addressLine2 =
                                                            event.target.value;
                                                        setAddress(copy);
                                                    }}
                                                    value={address.addressLine2}
                                                />
                                            </div>
                                            <div className={inputContainer}>
                                                <HiTruck className="ml-4" />

                                                <input
                                                    className={inputfield}
                                                    placeholder="Postcode"
                                                    onChange={(
                                                        event: ChangeEvent<HTMLInputElement>
                                                    ): void => {
                                                        const copy = {
                                                            ...address,
                                                        };
                                                        copy.postcode =
                                                            event.target.value;
                                                        setAddress(copy);
                                                    }}
                                                    value={address.postcode}
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
                                                        const copy = {
                                                            ...address,
                                                        };
                                                        copy.cityTown =
                                                            event.target.value;
                                                        setAddress(copy);
                                                    }}
                                                    value={address.cityTown}
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="h-16 rounded-sm bg-lightergrey px-3 text-grey transition-all hover:bg-lightgrey hover:text-white"
                                            >
                                                Update my address
                                            </button>
                                        </form>
                                    </>
                                )}
                                {page === 'password' && <h1>password</h1>}
                                {page === 'orders' && <h1>Orders</h1>}
                                {page === 'deleteAccount' && (
                                    <h1>del accoutn</h1>
                                )}
                            </>
                        )}
                    </section>
                </div>
            )}
            <Footer />
        </>
    );

    //

    //                 <label htmlFor="password">Security</label>
    //                 <form
    //                     onSubmit={(event: FormEvent<HTMLFormElement>): void => {
    //                         event.preventDefault();
    //                         updatePassword();
    //                     }}
    //                 >
    //                     <PrimaryInput
    //                         type="text"
    //                         placeholder="Current Password"
    //                         id="password"
    //                         onChange={(
    //                             event: ChangeEvent<HTMLInputElement>
    //                         ): void => {
    //                             const copy = { ...password };
    //                             copy.currentPassword = event.target.value;
    //                             setPassword(copy);
    //                         }}
    //                         value={password.currentPassword}
    //                     />
    //                     <PrimaryInput
    //                         type="text"
    //                         placeholder="New Password"
    //                         onChange={(
    //                             event: ChangeEvent<HTMLInputElement>
    //                         ): void => {
    //                             const copy = { ...password };
    //                             copy.newPassword = event.target.value;
    //                             setPassword(copy);
    //                         }}
    //                         value={password.newPassword}
    //                     />
    //                     <PrimaryInput
    //                         type="text"
    //                         placeholder="Comfirm New Password"
    //                         onChange={(
    //                             event: ChangeEvent<HTMLInputElement>
    //                         ): void => {
    //                             const copy = { ...password };
    //                             copy.comfirmNewPassword = event.target.value;
    //                             setPassword(copy);
    //                         }}
    //                         value={password.comfirmNewPassword}
    //                     />
    //                     <UpdateBtn />
    //                 </form>

    //                 <SecondaryButton
    //                     onClick={() => logoutUser()}
    //                     content="Logout"
    //                     addClass="absolute right-32 top-10"
    //                 />

    //                 <SecondaryButton
    //                     onClick={(): Promise<boolean> => router.push('/')}
    //                     content="Back"
    //                     addClass="absolute right-10 top-10"
    //                 />
    //             </>
    //         );
    //     else return <h1>User not found</h1>;
    // else
    //     return (
    //         <>
    //             <h1>You are not logged in</h1>
    //             <SecondaryButton
    //                 onClick={() => router.push('/auth/login/')}
    //                 content="Login"
    //             />
    //         </>
    //     );
}
