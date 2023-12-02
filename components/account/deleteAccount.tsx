// Next/React
import { useState } from 'react';

// Utils
import fetchWithToken from '@/utils/JWT/fetchWithToken';

// Components
import HighlightText from '@/components/HighlightText';

// Types/Interfaces
import User from '@/database/models/User';
import { FormEvent, ChangeEvent } from 'react';
import { NextRouter } from 'next/router';

// Assets
import { HiLockClosed, HiEye, HiEyeOff } from 'react-icons/hi';
import { useRouter } from 'next/router';

interface props {
    user: User | undefined | null;
}

const inputContainer: string =
    'my-4 3xs:my-2 flex items-center rounded-sm bg-lightergrey';
const inputfield: string = 'h-14 w-full bg-lightergrey pl-2 focus:outline-none';
const submitButton: string =
    'h-16 w-48 rounded-sm bg-lightergrey px-3 text-grey transition-all hover:bg-lightgrey hover:text-white';

export default function DeleteAccount({ user }: props): JSX.Element {
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    const [password, setPassword] = useState<string>('');
    const router: NextRouter = useRouter();

    async function updatePassword(): Promise<void> {
        const response: Response = await fetchWithToken(
            process.env.NEXT_PUBLIC_URL + `/api/user/delete-account`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    password,
                }),
            }
        );
        const responseJson = await response.json();
        if (!response.ok) {
            setError(responseJson.error);
            setLoading(false);
            return;
        }

        localStorage.removeItem('token');
        setLoading(false);
        router.push('/');
    }

    return (
        <>
            <h1 className="py-5 text-3xl text-grey2">Delete my account</h1>

            <p className="text-red">
                <HighlightText color="red">{error}</HighlightText>
            </p>
            <form
                onSubmit={(event: FormEvent<HTMLFormElement>) => {
                    event.preventDefault();

                    setError('');
                    setLoading(true);
                    updatePassword();
                }}
            >
                <div className={inputContainer}>
                    <HiLockClosed className="ml-4" size={22} />

                    <input
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder="Current Password"
                        className={inputfield}
                        onChange={(
                            event: ChangeEvent<HTMLInputElement>
                        ): void => setPassword(event.target.value)}
                        required
                    />

                    {passwordVisible ? (
                        <HiEyeOff
                            className="mr-4 cursor-pointer"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            size={22}
                        />
                    ) : (
                        <HiEye
                            className="mr-4 cursor-pointer"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            size={22}
                        />
                    )}
                </div>

                <button type="submit" className={submitButton}>
                    {loading ? 'Loading' : 'Delete my account'}
                </button>
            </form>
        </>
    );
}
