// React/Next
import { useState } from 'react';

// Types/Interfaces
import { ChangeEvent, FormEvent } from 'react';
import User from '@/database/models/User';

// Components
import HighlightText from '@/components/HighlightText';

// Assets
import { HiLocationMarker, HiTruck, HiHome } from 'react-icons/hi';

// Utils
import fetchWithToken from '@/utils/JWT/fetchWithToken';

const inputContainer: string =
    'my-4 3xs:my-2 flex items-center rounded-sm bg-lightergrey';
const inputfield: string = 'h-14 w-full bg-lightergrey pl-2 focus:outline-none';
const submitButton: string =
    'h-16 w-48 rounded-sm bg-lightergrey px-3 text-grey transition-all hover:bg-lightgrey hover:text-white';

interface props {
    user: User;
}

export default function Address({ user }: props): JSX.Element {
    const [address, setAddress] = useState<any>(user);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    async function updateUserInfo(): Promise<void> {
        const response: Response = await fetchWithToken(
            process.env.NEXT_PUBLIC_URL + `/api/user/alterUser`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    newInfo: address,
                }),
            }
        );
        const responseJson = await response.json();

        if (!response.ok) {
            setError(responseJson.error);
            setLoading(false);
            return;
        }
        setLoading(false);
        setAddress(responseJson.user);
    }

    return (
        <>
            <h1 className="py-5 text-3xl text-grey2">Address</h1>
            <p className="text-red">
                <HighlightText color="red">{error}</HighlightText>
            </p>
            <form
                onSubmit={(event: FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    setLoading(true);
                    setError('');
                    updateUserInfo();
                }}
            >
                <div className={inputContainer}>
                    <HiHome className="ml-4" size={22} />
                    <input
                        placeholder="Address line 1"
                        className="h-14 w-2/5 bg-lightergrey pl-2 focus:outline-none"
                        onChange={(
                            event: ChangeEvent<HTMLInputElement>
                        ): void => {
                            const copy = {
                                ...address,
                            };
                            copy.addressLine1 = event.target.value;
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
                            copy.addressLine2 = event.target.value;
                            setAddress(copy);
                        }}
                        value={address.addressLine2}
                    />
                </div>
                <div className={inputContainer}>
                    <HiTruck className="ml-4" size={22} />

                    <input
                        className={inputfield}
                        placeholder="Postcode"
                        onChange={(
                            event: ChangeEvent<HTMLInputElement>
                        ): void => {
                            const copy = {
                                ...address,
                            };
                            copy.postcode = event.target.value;
                            setAddress(copy);
                        }}
                        value={address.postcode}
                    />
                </div>
                <div className={inputContainer}>
                    <HiLocationMarker className="ml-4" size={22} />

                    <input
                        className={inputfield}
                        placeholder="City/Town"
                        onChange={(
                            event: ChangeEvent<HTMLInputElement>
                        ): void => {
                            const copy = {
                                ...address,
                            };
                            copy.cityTown = event.target.value;
                            setAddress(copy);
                        }}
                        value={address.cityTown}
                    />
                </div>
                <button type="submit" className={submitButton}>
                    {loading ? 'Loading' : 'Update my address'}
                </button>
            </form>
        </>
    );
}
