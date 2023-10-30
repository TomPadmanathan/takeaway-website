// React/Next
import { NextRouter } from 'next/router';
import { useState } from 'react';

// Components
import SecondaryButton from '@/components/SecondaryButton';
import PrimaryInput from '@/components/PrimaryInput';

// Utils
import removeArrowsFromInput from '@/utils/removeArrowsFromInput';

// Types/Interfaces
import { useRouter } from 'next/router';
import { checkoutInfoGuest } from '@/interfaces/checkoutInfo';
import { ParsedUrlQueryInput } from 'querystring';
import { ChangeEvent } from 'react';

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

    if (showGuest) {
        return (
            <>
                <div className="flex h-full flex-col items-center justify-center">
                    <SecondaryButton
                        content="Continue as guest"
                        onClick={(): void => setShowGuest(!showGuest)}
                        addClass="m-5"
                    />
                    <SecondaryButton
                        content="Login"
                        onClick={(): Promise<boolean> =>
                            router.push({
                                pathname: '/auth/login',
                                query: {
                                    url: `${process.env.NEXT_PUBLIC_URL}/checkout`,
                                },
                            })
                        }
                        addClass="m-5"
                    />
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="flex flex-col items-center">
                    <h2>Guest Checkout</h2>
                    <span>or</span>
                    <SecondaryButton
                        content="Login"
                        onClick={(): Promise<boolean> =>
                            router.push({
                                pathname: 'auth/login',
                                query: {
                                    url: `${process.env.NEXT_PUBLIC_URL}/checkout`,
                                },
                            })
                        }
                        addClass="mx-5 mb-5 mt-2 px-20"
                    />
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
                    <label htmlFor="phoneNumber">Your Info</label>
                    <div className="mb-10">
                        <div className="mb-2 flex justify-between">
                            <PrimaryInput
                                type="number"
                                placeholder="Phone Number"
                                id="phoneNumber"
                                required={true}
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
                                addClass={removeArrowsFromInput}
                            />
                            <PrimaryInput
                                type="email"
                                placeholder="Email"
                                id="email"
                                autoComplete={false}
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ): void => {
                                    const copy = {
                                        ...checkoutUserInfomation,
                                    };
                                    copy.email = event.target.value;
                                    setCheckoutUserInfomation(copy);
                                }}
                                required={true}
                            />
                        </div>
                        <div className="mb-2 flex justify-between">
                            <PrimaryInput
                                type="text"
                                id="forename"
                                placeholder="Forename"
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ): void => {
                                    const copy = { ...checkoutUserInfomation };
                                    copy.forename = event.target.value;
                                    setCheckoutUserInfomation(copy);
                                }}
                                required={true}
                            />
                            <PrimaryInput
                                type="text"
                                placeholder="Surname"
                                id="surname"
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ): void => {
                                    const copy = { ...checkoutUserInfomation };
                                    copy.surname = event.target.value;
                                    setCheckoutUserInfomation(copy);
                                }}
                                required={true}
                            />
                        </div>
                    </div>
                    <label htmlFor="addressLine1">Address</label>
                    <div className="mb-2 flex justify-between">
                        <PrimaryInput
                            placeholder="Address line 1"
                            id="addressLine1"
                            required={true}
                            onChange={(
                                event: ChangeEvent<HTMLInputElement>
                            ): void => {
                                const copy = { ...checkoutUserInfomation };
                                copy.addressLine1 = event.target.value;
                                setCheckoutUserInfomation(copy);
                            }}
                        />
                        <PrimaryInput
                            placeholder="Address line 2 (optional)"
                            id="addressLine2"
                            onChange={(
                                event: ChangeEvent<HTMLInputElement>
                            ): void => {
                                const copy = { ...checkoutUserInfomation };
                                copy.addressLine2 = event.target.value;
                                setCheckoutUserInfomation(copy);
                            }}
                        />
                    </div>
                    <div className="mb-10 flex justify-between">
                        <PrimaryInput
                            placeholder="City/Town"
                            id="cityTown"
                            onChange={(
                                event: ChangeEvent<HTMLInputElement>
                            ): void => {
                                const copy = { ...checkoutUserInfomation };
                                copy.cityTown = event.target.value;
                                setCheckoutUserInfomation(copy);
                            }}
                        />
                        <PrimaryInput
                            placeholder="Postcode"
                            id="postcode"
                            value={checkoutUserInfomation.postcode}
                            onChange={(
                                event: ChangeEvent<HTMLInputElement>
                            ): void => {
                                const copy = { ...checkoutUserInfomation };
                                copy.postcode =
                                    event.target.value.toUpperCase();
                                setCheckoutUserInfomation(copy);
                            }}
                        />
                    </div>
                    <label htmlFor="orderNote">Order Info</label>
                    <div className="flex justify-between">
                        <textarea
                            placeholder="Leave us a note (optional)"
                            className="block h-10 resize-none border border-black"
                            onChange={(
                                event: ChangeEvent<HTMLTextAreaElement>
                            ): void => {
                                const copy = { ...checkoutUserInfomation };
                                copy.orderNote = event.target.value;
                                setCheckoutUserInfomation(copy);
                            }}
                            id="orderNote"
                        />
                        <label htmlFor="includeCutlery">Include Cutlery</label>
                        <PrimaryInput
                            type="checkbox"
                            id="includeCutlery"
                            onChange={(
                                event: ChangeEvent<HTMLInputElement>
                            ): void => {
                                const copy = { ...checkoutUserInfomation };
                                copy.includeCutlery = event.target.checked;
                                setCheckoutUserInfomation(copy);
                            }}
                        />
                    </div>
                    <div className="mt-5 flex items-center justify-center">
                        <SecondaryButton
                            type="submit"
                            content="Place my Order"
                            addClass="justify-center"
                        />
                    </div>
                </form>
            </>
        );
    }
}
