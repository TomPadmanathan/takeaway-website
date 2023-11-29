// React/Next
import { useState, useEffect, FormEvent } from 'react';
import { NextRouter, useRouter } from 'next/router';

// Database Models
import User from '@/database/models/User';

// Types/Interfaces
import fetchWithToken from '@/utils/JWT/fetchWithToken';
import { ChangeEvent } from 'react';

// Utils
import removeArrowsFromInput from '@/utils/removeArrowsFromInput';

// Components
import PrimaryInput from '@/components/PrimaryInput';
import SecondaryButton from '@/components/SecondaryButton';

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
            if (responseJson.error) {
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

    function UpdateBtn(): JSX.Element {
        return <SecondaryButton content="Update" type="submit" />;
    }

    function logoutUser(): void {
        // Remove token validitaty from backend later
        localStorage.removeItem('token');
        router.push('/');
    }

    if (token)
        if (user && yourInfo && address)
            return (
                <>
                    <label htmlFor="phone-number">Your Info</label>
                    <div className="mb-10">
                        <form
                            onSubmit={(event: FormEvent<HTMLFormElement>) => {
                                event.preventDefault();
                                updateUserInfo('yourInfo');
                            }}
                        >
                            <PrimaryInput
                                type="number"
                                placeholder="Phone Number"
                                id="phone-number"
                                inputMode="numeric"
                                onKeyPress={(event: any): void => {
                                    if (!/[0-9]/.test(event.key))
                                        event.preventDefault();
                                }}
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ): void => {
                                    const copy = { ...yourInfo };
                                    copy.phoneNumber = event.target.value;
                                    setYourInfo(copy);
                                }}
                                value={yourInfo.phoneNumber}
                                addClass={removeArrowsFromInput}
                            />
                            <PrimaryInput
                                type="email"
                                placeholder="Email"
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ): void => {
                                    const copy = { ...yourInfo };
                                    copy.email = event.target.value;
                                    setYourInfo(copy);
                                }}
                                value={yourInfo.email}
                            />
                            <PrimaryInput
                                type="text"
                                placeholder="Forename"
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ): void => {
                                    const copy = { ...yourInfo };
                                    copy.forename = event.target.value;
                                    setYourInfo(copy);
                                }}
                                value={yourInfo.forename}
                            />
                            <PrimaryInput
                                type="text"
                                placeholder="Surname"
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ): void => {
                                    const copy = { ...yourInfo };
                                    copy.surname = event.target.value;
                                    setYourInfo(copy);
                                }}
                                value={yourInfo.surname}
                            />
                            <UpdateBtn />
                        </form>
                    </div>
                    <div className="mb-10">
                        <label htmlFor="address-line-1">Address</label>
                        <form
                            onSubmit={event => {
                                event.preventDefault();
                                updateUserInfo('address');
                            }}
                        >
                            <PrimaryInput
                                placeholder="Address line 1"
                                id="address-line-1"
                                required={true}
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ): void => {
                                    const copy = { ...address };
                                    copy.addressLine1 = event.target.value;
                                    setAddress(copy);
                                }}
                                value={address.addressLine1}
                            />
                            <PrimaryInput
                                placeholder="Address line 2 (optional)"
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ): void => {
                                    const copy = { ...address };
                                    copy.addressLine2 = event.target.value;
                                    setAddress(copy);
                                }}
                                value={address.addressLine2}
                            />
                            <PrimaryInput
                                placeholder="City/Town"
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ): void => {
                                    const copy = { ...address };
                                    copy.cityTown = event.target.value;
                                    setAddress(copy);
                                }}
                                value={address.cityTown}
                            />
                            <PrimaryInput
                                placeholder="Postcode"
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ): void => {
                                    const copy = { ...address };
                                    copy.postcode = event.target.value;
                                    setAddress(copy);
                                }}
                                value={address.postcode}
                            />
                            <UpdateBtn />
                        </form>
                    </div>

                    <label htmlFor="password">Security</label>
                    <form
                        onSubmit={(event: FormEvent<HTMLFormElement>): void => {
                            event.preventDefault();
                            updatePassword();
                        }}
                    >
                        <PrimaryInput
                            type="text"
                            placeholder="Current Password"
                            id="password"
                            onChange={(
                                event: ChangeEvent<HTMLInputElement>
                            ): void => {
                                const copy = { ...password };
                                copy.currentPassword = event.target.value;
                                setPassword(copy);
                            }}
                            value={password.currentPassword}
                        />
                        <PrimaryInput
                            type="text"
                            placeholder="New Password"
                            onChange={(
                                event: ChangeEvent<HTMLInputElement>
                            ): void => {
                                const copy = { ...password };
                                copy.newPassword = event.target.value;
                                setPassword(copy);
                            }}
                            value={password.newPassword}
                        />
                        <PrimaryInput
                            type="text"
                            placeholder="Comfirm New Password"
                            onChange={(
                                event: ChangeEvent<HTMLInputElement>
                            ): void => {
                                const copy = { ...password };
                                copy.comfirmNewPassword = event.target.value;
                                setPassword(copy);
                            }}
                            value={password.comfirmNewPassword}
                        />
                        <UpdateBtn />
                    </form>

                    <SecondaryButton
                        onClick={() => logoutUser()}
                        content="Logout"
                        addClass="absolute right-32 top-10"
                    />

                    <SecondaryButton
                        onClick={(): Promise<boolean> => router.push('/')}
                        content="Back"
                        addClass="absolute right-10 top-10"
                    />
                </>
            );
        else return <h1>User not found</h1>;
    else
        return (
            <>
                <h1>You are not logged in</h1>
                <SecondaryButton
                    onClick={() => router.push('/auth/login/')}
                    content="Login"
                />
            </>
        );
}
