// React/Next
import { useState } from 'react';

// Types/Interfaces
import fetchWithToken from '@/utils/JWT/fetchWithToken';
import { ChangeEvent, FormEvent } from 'react';

// Components

import HighlightText from '@/components/HighlightText';

// Assets
import { HiLockClosed, HiEye, HiEyeOff } from 'react-icons/hi';

const inputContainer: string =
    'my-4 3xs:my-2 flex items-center rounded-sm bg-lightergrey';
const inputfield: string = 'h-14 w-full bg-lightergrey pl-2 focus:outline-none';
const submitButton: string =
    'h-16 w-48 rounded-sm bg-lightergrey px-3 text-grey transition-all hover:bg-lightgrey hover:text-white';

export default function Password(): JSX.Element {
    const [passwordVisible1, setPasswordVisible1] = useState<boolean>(false);
    const [passwordVisible2, setPasswordVisible2] = useState<boolean>(false);
    const [passwordVisible3, setPasswordVisible3] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

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

    async function updatePassword(): Promise<void> {
        if (password.newPassword != password.comfirmNewPassword) {
            setError("New passwords don't match");
            setLoading(false);
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
            setError(responseJson.error);
            setLoading(false);
            return;
        }
        setLoading(false);
        setPassword(emptyPassword);
    }

    return (
        <>
            <h1 className="py-5 text-3xl text-grey2">Password</h1>

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
                        type={passwordVisible1 ? 'text' : 'password'}
                        placeholder="Current Password"
                        className={inputfield}
                        onChange={(
                            event: ChangeEvent<HTMLInputElement>
                        ): void => {
                            const copy = {
                                ...password,
                            };
                            copy.currentPassword = event.target.value;
                            setPassword(copy);
                        }}
                        value={password.currentPassword}
                        required
                    />

                    {passwordVisible1 ? (
                        <HiEyeOff
                            className="mr-4 cursor-pointer"
                            onClick={() =>
                                setPasswordVisible1(!passwordVisible1)
                            }
                            size={22}
                        />
                    ) : (
                        <HiEye
                            className="mr-4 cursor-pointer"
                            onClick={() =>
                                setPasswordVisible1(!passwordVisible1)
                            }
                            size={22}
                        />
                    )}
                </div>

                <div className={inputContainer}>
                    <HiLockClosed className="ml-4" size={22} />

                    <input
                        type={passwordVisible2 ? 'text' : 'password'}
                        placeholder="New Password"
                        className={inputfield}
                        onChange={(
                            event: ChangeEvent<HTMLInputElement>
                        ): void => {
                            const copy = {
                                ...password,
                            };
                            copy.newPassword = event.target.value;
                            setPassword(copy);
                        }}
                        value={password.newPassword}
                        required
                    />

                    {passwordVisible2 ? (
                        <HiEyeOff
                            className="mr-4 cursor-pointer"
                            onClick={() =>
                                setPasswordVisible2(!passwordVisible2)
                            }
                            size={22}
                        />
                    ) : (
                        <HiEye
                            className="mr-4 cursor-pointer"
                            onClick={() =>
                                setPasswordVisible2(!passwordVisible2)
                            }
                            size={22}
                        />
                    )}
                </div>

                <div className={inputContainer}>
                    <HiLockClosed className="ml-4" size={22} />

                    <input
                        type={passwordVisible3 ? 'text' : 'password'}
                        placeholder="Comfirm New Password"
                        className={inputfield}
                        onChange={(
                            event: ChangeEvent<HTMLInputElement>
                        ): void => {
                            const copy = {
                                ...password,
                            };
                            copy.comfirmNewPassword = event.target.value;
                            setPassword(copy);
                        }}
                        value={password.comfirmNewPassword}
                        required
                    />

                    {passwordVisible3 ? (
                        <HiEyeOff
                            className="mr-4 cursor-pointer"
                            onClick={() =>
                                setPasswordVisible3(!passwordVisible3)
                            }
                            size={22}
                        />
                    ) : (
                        <HiEye
                            className="mr-4 cursor-pointer"
                            onClick={() =>
                                setPasswordVisible3(!passwordVisible3)
                            }
                            size={22}
                        />
                    )}
                </div>

                <button type="submit" className={submitButton}>
                    {loading ? 'Loading' : 'Update my password'}
                </button>
            </form>
        </>
    );
}
