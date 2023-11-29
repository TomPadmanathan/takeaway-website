// React/Next
import { useRouter } from 'next/router';
import { useState } from 'react';

// Components
import HighlightText from '@/components/HighlightText';

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

// Types/Interfaces
import { NextRouter } from 'next/router';
import User from '@/database/models/User';
import { ChangeEvent, FormEvent } from 'react';
import { ParsedUrlQueryInput } from 'querystring';
import { checkoutInfoUser } from '@/interfaces/checkoutInfo';

interface props {
    user: User;
}

function checkoutUserInfomationToQueryParams(
    checkoutInfo: checkoutInfoUser
): ParsedUrlQueryInput {
    return {
        orderNote: checkoutInfo.orderNote,
        includeCutlery: checkoutInfo.includeCutlery.toString(),
    };
}

export default function CheckoutUser({ user }: props): JSX.Element {
    const router: NextRouter = useRouter();
    const tailwindColors: any = tailwindConfig?.theme?.colors;

    const [checkoutInfo, setCheckoutInfo] = useState<checkoutInfoUser>({
        orderNote: '',
        includeCutlery: false,
    });

    const inputContainer: string =
        'my-4 flex items-center rounded-sm bg-lightergrey';
    const inputfield: string =
        'h-14 w-full bg-lightergrey pl-2 focus:outline-none';

    return (
        <>
            <section className="relative h-full">
                <div className="flex flex-col items-center">
                    <h2 className="py-4 text-2xl text-grey2">
                        Checkout as:
                        <HighlightText>
                            {' ' + user.forename + ' ' + user.surname}
                        </HighlightText>
                    </h2>
                </div>
                <div className={inputContainer}>
                    <HiMail className="ml-4" />
                    <input
                        type="email"
                        placeholder="Email"
                        className={inputfield}
                        value={user.email}
                        disabled
                    />
                </div>

                <div className={inputContainer}>
                    <HiPhone className="ml-4" />
                    <input
                        type="number"
                        placeholder="Phone Number"
                        className={inputfield}
                        id="phone-number"
                        inputMode="numeric"
                        value={user.phoneNumber}
                        disabled
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
                        disabled
                        value={user.forename}
                    />
                    <div className="h-14 w-2 bg-white" />
                    <input
                        className={
                            'ml-2 h-14 w-2/5 bg-lightergrey pl-2 focus:outline-none'
                        }
                        type="text"
                        placeholder="Surname"
                        disabled
                        value={user.surname}
                    />
                </div>

                <div className={inputContainer}>
                    <HiHome className="ml-4" />
                    <input
                        placeholder="Address line 1"
                        className="h-14 w-2/5 bg-lightergrey pl-2 focus:outline-none"
                        disabled
                        value={user.addressLine1}
                    />
                    <div className="h-14 w-2 bg-white" />
                    <input
                        className="ml-2 mr-0 h-14 w-2/5 bg-lightergrey pl-2 focus:outline-none"
                        placeholder="Address line 2"
                        disabled
                        value={user.addressLine2}
                    />
                </div>
                <div className={inputContainer}>
                    <HiTruck className="ml-4" />

                    <input
                        className={inputfield}
                        placeholder="Postcode"
                        disabled
                        value={user.postcode}
                    />
                </div>
                <div className={inputContainer}>
                    <HiLocationMarker className="ml-4" />

                    <input
                        className={inputfield}
                        placeholder="City/Town"
                        disabled
                        value={user.cityTown}
                    />
                </div>
                <form
                    className="flex h-full justify-between"
                    onSubmit={(event: FormEvent): void => {
                        event.preventDefault();
                        router.push({
                            pathname: '/checkout/new-checkout-session',
                            query: checkoutUserInfomationToQueryParams(
                                checkoutInfo
                            ),
                        });
                    }}
                >
                    <center className="w-52">
                        <label htmlFor="orderNote">
                            <p className="text-grey2">Leave us a note</p>
                        </label>
                        <textarea
                            className={inputfield + ' resize-none rounded-sm'}
                            onChange={(
                                event: ChangeEvent<HTMLTextAreaElement>
                            ): void => {
                                const copy = {
                                    ...checkoutInfo,
                                };
                                copy.orderNote = event.target.value;
                                setCheckoutInfo(copy);
                            }}
                            id="orderNote"
                        />
                    </center>
                    <div className="flex w-52 justify-center">
                        <center>
                            <label htmlFor="includeCutlery">
                                <p className="text-grey2">Include Cutlery</p>
                            </label>
                            <div className="w-[70px] rounded bg-lightergrey">
                                <input
                                    type="checkbox"
                                    id="switch"
                                    checked={checkoutInfo.includeCutlery}
                                    onChange={(
                                        event: ChangeEvent<HTMLInputElement>
                                    ): void => {
                                        const copy = {
                                            ...checkoutInfo,
                                        };
                                        copy.includeCutlery =
                                            event.target.checked;
                                        setCheckoutInfo(copy);
                                    }}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="switch"
                                    className={`toggle-label relative block h-8 cursor-pointer rounded transition-all ${
                                        checkoutInfo.includeCutlery && 'bg-pink'
                                    } `}
                                >
                                    <span
                                        className={`absolute left-1 top-1 h-6 w-6 rounded bg-grey transition-all ${
                                            checkoutInfo.includeCutlery &&
                                            ' left-[42px] bg-white'
                                        }`}
                                    ></span>
                                </label>
                            </div>
                        </center>
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
        </>
    );
}
