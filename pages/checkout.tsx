// React/Next
import { ChangeEvent, useContext, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';

// Context
import { AppContext } from '@/context/AppContext';

// Utiles
import removeArrowsFromInput from '@/utils/removeArrowsFromInput';

// Components
import SecondaryButton from '@/components/SecondaryButton';
import PrimaryInput from '@/components/PrimaryInput';
import ListItemsWithPrice from '@/components/ListItemsWithPrice';

// Types/Interfaces
import { checkoutUserInfomation } from '@/interfaces/checkoutUserInfomation';
import { ParsedUrlQueryInput } from 'querystring';
import { config } from '@/interfaces/config';

interface props {
    configData: config;
}
interface getServerSideProps {
    props: props;
}

export async function getServerSideProps(): Promise<getServerSideProps> {
    const configRes: Response = await fetch(
        process.env.NEXT_PUBLIC_URL + '/api/config'
    );
    const configData: config = await configRes.json();
    return {
        props: {
            configData,
        },
    };
}

function checkoutUserInfomationToQueryParams(
    info: checkoutUserInfomation
): ParsedUrlQueryInput {
    return {
        includeCutlery: info.includeCutlery.toString(),
        phoneNumber: info.phoneNumber.toString(),
        email: info.email,
        addressLine1: info.addressLine1,
        addressLine2: info.addressLine2,
        cityTown: info.cityTown,
        postcode: info.postcode,
        orderNote: info.orderNote,
        name: info.name,
    };
}

export default function Home({ configData }: props): JSX.Element {
    const router: NextRouter = useRouter();
    const { cart } = useContext(AppContext);
    const [checkoutUserInfomation, setCheckoutUserInfomation] =
        useState<checkoutUserInfomation>({
            includeCutlery: false,
            phoneNumber: 0,
            email: '',
            addressLine1: '',
            addressLine2: '',
            cityTown: '',
            postcode: '',
            orderNote: '',
            name: '',
        });

    return (
        <>
            <div className="mx-96 my-10 flex h-screen items-center justify-between">
                <ListItemsWithPrice cart={cart} config={configData} />
                <section className="h-[45rem] w-[30rem] border-2 border-black p-10">
                    <form
                        onSubmit={(): Promise<boolean> =>
                            router.push({
                                pathname: '/checkout/new-checkout-session',
                                query: checkoutUserInfomationToQueryParams(
                                    checkoutUserInfomation
                                ),
                            })
                        }
                    >
                        <label htmlFor="phone-number">Your Info</label>
                        <div className="mb-10">
                            <div className="mb-2 flex justify-between">
                                <PrimaryInput
                                    type="number"
                                    placeholder="Phone Number"
                                    id="phone-number"
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
                            <PrimaryInput
                                type="text"
                                placeholder="Full Name"
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ): void => {
                                    const copy = { ...checkoutUserInfomation };
                                    copy.name = event.target.value;
                                    setCheckoutUserInfomation(copy);
                                }}
                                required={true}
                            />
                        </div>
                        <label htmlFor="address-line-1">Address</label>
                        <div className="mb-2 flex justify-between">
                            <PrimaryInput
                                placeholder="Address line 1"
                                id="address-line-1"
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
                        <label htmlFor="">Order Info</label>
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
                            />
                            <label htmlFor="include-cutlery">
                                Include Cutlery
                            </label>
                            <PrimaryInput
                                type="checkbox"
                                id="include-cutlery"
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
                </section>
            </div>

            <SecondaryButton
                onClick={(): Promise<boolean> => router.push('/')}
                content="Back"
                addClass="absolute right-10 top-10"
            />
        </>
    );
}
