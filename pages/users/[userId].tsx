// React/Next
import { useState, useEffect } from 'react';
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

export default function OrderId(): JSX.Element {
    const [user, setUser] = useState<User | null>();
    const router: NextRouter = useRouter();

    // get user with token
    useEffect((): void => {
        async function fetchData(): Promise<void> {
            if (!router.isReady) return;
            const response: Response = await fetchWithToken(
                process.env.NEXT_PUBLIC_URL +
                    `/api/getUserFromId?userId=${router.query.userId}`,
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
    }, [router.isReady]);

    function updatePassword() {}
    function updateYourInfo() {}
    function updateAddress() {}

    useEffect((): void => console.log(user), [user]);

    function UpdateBtn(): JSX.Element {
        return <SecondaryButton content="Update" type="submit" />;
    }

    if (user)
        return (
            <>
                <label htmlFor="phone-number">Your Info</label>
                <div className="mb-10">
                    <form
                        onSubmit={event => {
                            event.preventDefault();
                            updateYourInfo();
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
                            ): void => {}}
                            value={user.phoneNumber}
                            addClass={removeArrowsFromInput}
                        />
                        <PrimaryInput
                            type="email"
                            placeholder="Email"
                            onChange={(
                                event: ChangeEvent<HTMLInputElement>
                            ): void => {}}
                            value={user.email}
                        />
                        <PrimaryInput
                            type="text"
                            placeholder="Forename"
                            onChange={(
                                event: ChangeEvent<HTMLInputElement>
                            ): void => {}}
                            value={user.forename}
                        />
                        <PrimaryInput
                            type="text"
                            placeholder="Surname"
                            onChange={(
                                event: ChangeEvent<HTMLInputElement>
                            ): void => {}}
                            value={user.surname}
                        />
                        <UpdateBtn />
                    </form>
                </div>
                <div className="mb-10">
                    <label htmlFor="address-line-1">Address</label>
                    <form
                        onSubmit={event => {
                            event.preventDefault();
                            updateAddress();
                        }}
                    >
                        <PrimaryInput
                            placeholder="Address line 1"
                            id="address-line-1"
                            required={true}
                            onChange={(
                                event: ChangeEvent<HTMLInputElement>
                            ): void => {}}
                            value={user.addressLine1}
                        />
                        <PrimaryInput
                            placeholder="Address line 2 (optional)"
                            onChange={(
                                event: ChangeEvent<HTMLInputElement>
                            ): void => {}}
                            value={user.addressLine2}
                        />
                        <PrimaryInput
                            placeholder="City/Town"
                            onChange={(
                                event: ChangeEvent<HTMLInputElement>
                            ): void => {}}
                            value={user.cityTown}
                        />
                        <PrimaryInput
                            placeholder="Postcode"
                            onChange={(
                                event: ChangeEvent<HTMLInputElement>
                            ): void => {}}
                            value={user.postcode}
                        />
                        <UpdateBtn />
                    </form>
                </div>

                <label htmlFor="password">Security</label>
                <form
                    onSubmit={event => {
                        event.preventDefault();
                        updatePassword();
                    }}
                >
                    <PrimaryInput
                        type="text"
                        placeholder="New Password"
                        id="password"
                    />
                    <PrimaryInput
                        type="text"
                        placeholder="Comfirm New Password"
                    />
                    <UpdateBtn />
                </form>
            </>
        );
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
