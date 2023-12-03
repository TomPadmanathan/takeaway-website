// React/Next
import { NextRouter } from 'next/router';
import { useState } from 'react';
import { IconContext } from 'react-icons';

// Components
import PrimaryInput from '@/components/PrimaryInput';

// Utils
import removeArrowsFromInput from '@/utils/removeArrowsFromInput';

// Types/Interfaces
import { useRouter } from 'next/router';
import { checkoutInfoGuest } from '@/interfaces/checkoutInfo';
import { ParsedUrlQueryInput } from 'querystring';
import { ChangeEvent } from 'react';

// Assets
import tailwindConfig from '@/tailwind.config';
import {
    HiMail,
    HiPhone,
    HiUser,
    HiTruck,
    HiHome,
    HiLocationMarker,
} from 'react-icons/hi';

function checkoutUserInfomationToQueryParams(
    checkoutInfo: checkoutInfoGuest
): ParsedUrlQueryInput {
    return {
        includeCutlery: checkoutInfo.includeCutlery.toString(),
        phoneNumber: checkoutInfo.phoneNumber.toString(),
        email: checkoutInfo.email,
        addressLine1: checkoutInfo.addressLine1,
        addressLine2: checkoutInfo.addressLine2,
        cityTown: checkoutInfo.cityTown,
        postcode: checkoutInfo.postcode,
        orderNote: checkoutInfo.orderNote,
        forename: checkoutInfo.forename,
        surname: checkoutInfo.surname,
        userType: checkoutInfo.userType,
    };
}

export default function CheckoutGuest(): JSX.Element {
    const router: NextRouter = useRouter();
    const tailwindColors: any = tailwindConfig?.theme?.colors;

    const [checkoutUserInfomation, setCheckoutUserInfomation] =
        useState<checkoutInfoGuest>({
            includeCutlery: false,
            phoneNumber: 0,
            email: '',
            addressLine1: '',
            addressLine2: '',
            cityTown: '',
            postcode: '',
            orderNote: '',
            forename: '',
            surname: '',
        });
    const [showGuest, setShowGuest] = useState<boolean>(true);

    const inputContainer: string =
        'my-4 flex items-center rounded-sm bg-lightergrey';
    const inputfield: string =
        'h-14 w-full bg-lightergrey pl-2 focus:outline-none';

    if (showGuest) {
        return (
            <section className="flex h-full flex-col items-center justify-center">
                <button
                    onClick={(): void => setShowGuest(!showGuest)}
                    className="h-16 rounded-sm bg-lightergrey px-3 text-grey transition-all hover:bg-lightgrey hover:text-white"
                >
                    Contine as Guest
                </button>
                <p className="my-5 text-grey">Or</p>
                <button
                    onClick={(): Promise<boolean> =>
                        router.push({
                            pathname: '/auth/login',
                            query: {
                                url: `${process.env.NEXT_PUBLIC_URL}/checkout`,
                            },
                        })
                    }
                    className="h-16 rounded-sm bg-lightergrey px-3 text-grey transition-all hover:bg-lightgrey hover:text-white"
                >
                    Login
                </button>
            </section>
        );
    } else {
        return (
            <IconContext.Provider
                value={{
                    color: tailwindColors.grey,
                    size: '22px',
                }}
            >
                <section className="relative h-full">
                    <div className="flex flex-col items-center">
                        <h2 className="py-4 text-3xl text-grey2">
                            Guest Checkout
                        </h2>
                    </div>
                    <form
                        onSubmit={(event: React.FormEvent): void => {
                            event.preventDefault();
                            router.push({
                                pathname: '/checkout/new-checkout-session',
                                query: checkoutUserInfomationToQueryParams(
                                    checkoutUserInfomation
                                ),
                            });
                        }}
                    >
                        <div className={inputContainer}>
                            <HiMail className="ml-4" />
                            <input
                                type="email"
                                placeholder="Email"
                                className={inputfield}
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ): void => {
                                    const copy = {
                                        ...checkoutUserInfomation,
                                    };
                                    copy.email = event.target.value;
                                    setCheckoutUserInfomation(copy);
                                }}
                                required
                            />
                        </div>

                        <div className={inputContainer}>
                            <HiPhone className="ml-4" />
                            <input
                                type="number"
                                placeholder="Phone Number"
                                className={inputfield}
                                id="phone-number"
                                required
                                inputMode="numeric"
                                onKeyPress={(event: any): void => {
                                    if (!/[0-9]/.test(event.key))
                                        event.preventDefault();
                                }}
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ): void => {
                                    const copy = {
                                        ...checkoutUserInfomation,
                                    };
                                    copy.phoneNumber = parseInt(
                                        event.target.value
                                    );
                                    setCheckoutUserInfomation(copy);
                                }}
                            />
                        </div>

                        <div className={inputContainer}>
                            <HiUser className="ml-4" />
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
                                        ...checkoutUserInfomation,
                                    };
                                    copy.forename = event.target.value;
                                    setCheckoutUserInfomation(copy);
                                }}
                                required
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
                                        ...checkoutUserInfomation,
                                    };
                                    copy.surname = event.target.value;
                                    setCheckoutUserInfomation(copy);
                                }}
                                required
                            />
                        </div>

                        <div className={inputContainer}>
                            <HiHome className="ml-4" />
                            <input
                                placeholder="Address line 1"
                                className="h-14 w-2/5 bg-lightergrey pl-2 focus:outline-none"
                                required
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ): void => {
                                    const copy = { ...checkoutUserInfomation };
                                    copy.addressLine1 = event.target.value;
                                    setCheckoutUserInfomation(copy);
                                }}
                            />
                            <div className="h-14 w-2 bg-white" />
                            <input
                                className="ml-2 mr-0 h-14 w-2/5 bg-lightergrey pl-2 focus:outline-none"
                                placeholder="Address line 2"
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ): void => {
                                    const copy = { ...checkoutUserInfomation };
                                    copy.addressLine2 = event.target.value;
                                    setCheckoutUserInfomation(copy);
                                }}
                            />
                        </div>
                        <div className={inputContainer}>
                            <HiTruck className="ml-4" />

                            <input
                                className={inputfield}
                                placeholder="Postcode"
                                value={checkoutUserInfomation.postcode}
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ): void => {
                                    const copy = { ...checkoutUserInfomation };
                                    copy.postcode =
                                        event.target.value.toUpperCase();
                                    setCheckoutUserInfomation(copy);
                                }}
                                required
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
                                    const copy = { ...checkoutUserInfomation };
                                    copy.cityTown = event.target.value;
                                    setCheckoutUserInfomation(copy);
                                }}
                                required
                            />
                        </div>
                        <div className="flex h-full justify-between">
                            <center className="w-52">
                                <label htmlFor="orderNote">
                                    <p className="text-grey2">
                                        Leave us a note
                                    </p>
                                </label>
                                <textarea
                                    className={
                                        inputfield +
                                        ' resize-none rounded-sm p-2'
                                    }
                                    onChange={(
                                        event: ChangeEvent<HTMLTextAreaElement>
                                    ): void => {
                                        const copy = {
                                            ...checkoutUserInfomation,
                                        };
                                        copy.orderNote = event.target.value;
                                        setCheckoutUserInfomation(copy);
                                    }}
                                    id="orderNote"
                                />
                            </center>
                            <div className="flex w-52 justify-center">
                                <center>
                                    <label htmlFor="includeCutlery">
                                        <p className="text-grey2">
                                            Include Cutlery
                                        </p>
                                    </label>
                                    <div className="w-[70px] rounded bg-lightergrey">
                                        <input
                                            type="checkbox"
                                            id="switch"
                                            checked={
                                                checkoutUserInfomation.includeCutlery
                                            }
                                            onChange={(
                                                event: ChangeEvent<HTMLInputElement>
                                            ): void => {
                                                const copy = {
                                                    ...checkoutUserInfomation,
                                                };
                                                copy.includeCutlery =
                                                    event.target.checked;
                                                setCheckoutUserInfomation(copy);
                                            }}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="switch"
                                            className={`toggle-label relative block h-8 cursor-pointer rounded transition-all ${
                                                checkoutUserInfomation.includeCutlery &&
                                                'bg-pink'
                                            } `}
                                        >
                                            <span
                                                className={`absolute left-1 top-1 h-6 w-6 rounded bg-grey transition-all ${
                                                    checkoutUserInfomation.includeCutlery &&
                                                    ' left-[42px] bg-white'
                                                }`}
                                            ></span>
                                        </label>
                                    </div>
                                </center>
                            </div>
                        </div>
                        <div className="absolute bottom-0 flex w-full justify-center">
                            <button
                                type="submit"
                                className="h-16 rounded-sm bg-lightergrey px-3 text-grey transition-all hover:bg-lightgrey hover:text-white"
                            >
                                Go to Payment
                            </button>
                        </div>
                    </form>
                </section>
            </IconContext.Provider>
        );
    }
}
