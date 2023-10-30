// React/Next
import { useRouter } from 'next/router';
import { useState } from 'react';

// Components
import SecondaryButton from '@/components/SecondaryButton';
import PrimaryInput from '@/components/PrimaryInput';

// Utils
import removeArrowsFromInput from '@/utils/removeArrowsFromInput';

// Types/Interfaces
import { NextRouter } from 'next/router';
import User from '@/database/models/User';
import { ChangeEvent } from 'react';
import { ParsedUrlQueryInput } from 'querystring';
import { checkoutInfoUser } from '@/interfaces/checkoutInfo';
import { FormEvent } from 'react';

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

    const [checkoutInfo, setCheckoutInfo] = useState<checkoutInfoUser>({
        orderNote: '',
        includeCutlery: false,
    });

    return (
        <>
            <h2 className="mb-10">
                Checkout as: {user.forename + ' ' + user.surname}
            </h2>
            <label htmlFor="phoneNumber">Your Info</label>
            <div className="mb-10">
                <div className="mb-2 flex justify-between">
                    <PrimaryInput
                        type="number"
                        placeholder="Phone Number"
                        id="phoneNumber"
                        required
                        inputMode="numeric"
                        addClass={removeArrowsFromInput}
                        value={user.phoneNumber}
                        disabled
                    />
                    <PrimaryInput
                        value={user.email}
                        type="email"
                        id="emailInput"
                        placeholder="Email"
                        required
                        disabled
                    />
                </div>
                <div className="mb-2 flex justify-between">
                    <PrimaryInput
                        value={user.forename}
                        type="text"
                        id="forename"
                        placeholder="Forename"
                        required
                        disabled
                    />
                    <PrimaryInput
                        value={user.surname}
                        id="surname"
                        type="text"
                        placeholder="Surname"
                        required
                        disabled
                    />
                </div>
            </div>
            <label htmlFor="addressLine1">Address</label>
            <div className="mb-2 flex justify-between">
                <PrimaryInput
                    value={user.addressLine1}
                    placeholder="Address line 1"
                    id="addressLine1"
                    required
                    disabled
                />
                <PrimaryInput
                    value={user.addressLine2}
                    id="addressLine2"
                    placeholder="Address line 2 (optional)"
                    disabled
                />
            </div>
            <div className="mb-10 flex justify-between">
                <PrimaryInput
                    placeholder="City/Town"
                    value={user.cityTown}
                    disabled
                    id="cityTown"
                />
                <PrimaryInput
                    placeholder="Postcode"
                    value={user.postcode}
                    id="postcode"
                    disabled
                />
            </div>
            <form
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
                <label htmlFor="orderNote">Order Info</label>
                <div className="flex justify-between">
                    <textarea
                        id="orderNote"
                        placeholder="Leave us a note (optional)"
                        className="block h-10 resize-none border border-black"
                        onChange={(
                            event: ChangeEvent<HTMLTextAreaElement>
                        ): void => {
                            const copy = { ...checkoutInfo };
                            copy.orderNote = event.target.value;
                            setCheckoutInfo(copy);
                        }}
                    />
                    <label htmlFor="includeCutlery">Include Cutlery</label>
                    <PrimaryInput
                        type="checkbox"
                        id="includeCutlery"
                        onChange={(
                            event: ChangeEvent<HTMLInputElement>
                        ): void => {
                            const copy = { ...checkoutInfo };
                            copy.includeCutlery = event.target.checked;
                            setCheckoutInfo(copy);
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
