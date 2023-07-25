import { useContext, useState } from 'react';
import { AppContext } from '@/context/AppContext';
import formatCart from '@/utils/formatCart';
import capitaliseFirstChar from '@/utils/capitaliseFirstChar';
import capitaliseFirstCharWords from '@/utils/capitaliseFirstCharWords';
import formatPrice from '@/utils/formatPrice';
import { useRouter } from 'next/router';
import CalculateCheckoutPrices from '@/utils/CalculateCheckoutPrices';
import removeArrowsFromInput from '@/utils/removeArrowsFromInput';
import SecondaryButton from '@/components/SecondaryButton';
import PrimaryInput from '@/components/PrimaryInput';
import { checkoutUserInfomation } from '@/interfaces/checkoutUserInfomation';
import { ParsedUrlQueryInput } from 'querystring';

export async function getServerSideProps() {
    const configRes = await fetch('http://localhost:3000/api/config');
    const configData = await configRes.json();
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
    };
}

export default function Home({ configData }: any) {
    const router = useRouter();
    const { cart } = useContext(AppContext);
    const modifiedCart = formatCart(cart);
    const prices = new CalculateCheckoutPrices(cart, configData);
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
        });

    return (
        <>
            <div className="mx-96 my-10 flex h-screen items-center justify-between">
                <section className="w-[30rem] border-2 border-black p-10">
                    <ul>
                        {modifiedCart.map((element: any, index: number) => (
                            <li
                                key={index}
                                className="mb-10 flex justify-between "
                            >
                                <span className="mr-4">
                                    {element.quantity + ' x'}
                                </span>

                                <div className="flex flex-col items-center">
                                    <span>
                                        {capitaliseFirstCharWords(
                                            element.product
                                        )}
                                    </span>
                                    <ul className="ml-10 list-disc">
                                        {element.options
                                            ? element.options.map(
                                                  (
                                                      element: any,
                                                      index: number
                                                  ) => (
                                                      <li key={index}>
                                                          {capitaliseFirstChar(
                                                              element
                                                          )}
                                                      </li>
                                                  )
                                              )
                                            : null}
                                    </ul>
                                </div>
                                <span>£{formatPrice(element.totalPrice)}</span>
                            </li>
                        ))}
                    </ul>
                    <span className="block text-end">
                        Sub-Total: £{formatPrice(prices.subTotal)}
                    </span>
                    {prices.lowOrderFee ? (
                        <span className="block text-end">
                            Low Order Fee: £{formatPrice(prices.lowOrderFee)}
                        </span>
                    ) : null}
                    <span className="block text-end">
                        Delivery Fee: £{formatPrice(prices.deliveryFee)}
                    </span>
                    <span className="block text-end">
                        Total: £{formatPrice(prices.total)}
                    </span>
                </section>
                <section className="h-[45rem] w-[30rem] border-2 border-black p-10">
                    <form
                        onSubmit={() =>
                            router.push({
                                pathname: '/checkout/new-checkout-session',
                                query: checkoutUserInfomationToQueryParams(
                                    checkoutUserInfomation
                                ),
                            })
                        }
                    >
                        <label htmlFor="phone-number">Your Info</label>
                        <div className="mb-10 flex justify-between">
                            <PrimaryInput
                                type="number"
                                placeholder="Phone Number"
                                id="phone-number"
                                required={true}
                                inputMode="numeric"
                                onKeyPress={(event: any) => {
                                    if (!/[0-9]/.test(event.key))
                                        event.preventDefault();
                                }}
                                onChange={(event: any) => {
                                    const copy = { ...checkoutUserInfomation };
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
                                onChange={(event: any) => {
                                    const copy = { ...checkoutUserInfomation };
                                    copy.email = event.target.value;
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
                                onChange={(event: any) => {
                                    const copy = { ...checkoutUserInfomation };
                                    copy.addressLine1 = event.target.value;
                                    setCheckoutUserInfomation(copy);
                                }}
                            />
                            <PrimaryInput
                                placeholder="Address line 2 (optional)"
                                onChange={(event: any) => {
                                    const copy = { ...checkoutUserInfomation };
                                    copy.addressLine2 = event.target.value;
                                    setCheckoutUserInfomation(copy);
                                }}
                            />
                        </div>
                        <div className="mb-10 flex justify-between">
                            <PrimaryInput
                                placeholder="City/Town"
                                onChange={(event: any) => {
                                    const copy = { ...checkoutUserInfomation };
                                    copy.cityTown = event.target.value;
                                    setCheckoutUserInfomation(copy);
                                }}
                            />
                            <PrimaryInput
                                placeholder="Postcode"
                                value={checkoutUserInfomation.postcode}
                                onChange={(event: any) => {
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
                                onChange={(event: any) => {
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
                                onChange={(event: any) => {
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
                onClick={() => router.push('/')}
                content="Back"
                addClass="absolute right-10 top-10"
            />
        </>
    );
}
