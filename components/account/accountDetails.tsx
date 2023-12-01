// React/Next
import { useState } from 'react';

// Database Models
import User from '@/database/models/User';

// Components
import HighlightText from '@/components/HighlightText';

// Types/Interfaces
import fetchWithToken from '@/utils/JWT/fetchWithToken';
import { ChangeEvent, FormEvent } from 'react';

// Assets
import { HiUser, HiMail, HiPhone } from 'react-icons/hi';

const inputContainer: string =
    'my-4 3xs:my-2 flex items-center rounded-sm bg-lightergrey';
const inputfield: string = 'h-14 w-full bg-lightergrey pl-2 focus:outline-none';
const submitButton: string =
    'h-16 w-48 rounded-sm bg-lightergrey px-3 text-grey transition-all hover:bg-lightgrey hover:text-white';

interface props {
    user: User;
}

export default function AccountDetails({ user }: props): JSX.Element {
    const [yourInfo, setYourInfo] = useState<any>(user);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    async function updateUserInfo(): Promise<void> {
        const response: Response = await fetchWithToken(
            process.env.NEXT_PUBLIC_URL + `/api/user/alterUser`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    newInfo: yourInfo,
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
        setYourInfo(responseJson.user);
    }

    return (
        <>
            <h1 className="py-5 text-3xl text-grey2">Account Details</h1>
            <p className="text-red">
                <HighlightText color="red">{error}</HighlightText>
            </p>
            <form
                onSubmit={(event: FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    setError('');
                    setLoading(true);
                    updateUserInfo();
                }}
            >
                <div className={inputContainer}>
                    <HiMail className="ml-4" size={22} />
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
                            copy.email = event.target.value;
                            setYourInfo(copy);
                        }}
                        value={yourInfo.email}
                    />
                </div>

                <div className={inputContainer}>
                    <HiPhone className="ml-4" size={22} />
                    <input
                        type="number"
                        placeholder="Phone Number"
                        className={inputfield}
                        id="phone-number"
                        inputMode="numeric"
                        onKeyPress={(event: any): void => {
                            if (!/[0-9]/.test(event.key))
                                event.preventDefault();
                        }}
                        onChange={(
                            event: ChangeEvent<HTMLInputElement>
                        ): void => {
                            const copy = {
                                ...yourInfo,
                            };
                            copy.phoneNumber = event.target.value;
                            setYourInfo(copy);
                        }}
                        value={yourInfo.phoneNumber}
                    />
                </div>

                <div className={inputContainer}>
                    <HiUser className="ml-4" size={22} />
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
                            copy.forename = event.target.value;
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
                            copy.surname = event.target.value;
                            setYourInfo(copy);
                        }}
                        value={yourInfo.surname}
                    />
                </div>
                <button type="submit" className={submitButton}>
                    {loading ? 'Loading' : 'Update my details'}
                </button>
            </form>
        </>
    );
}
