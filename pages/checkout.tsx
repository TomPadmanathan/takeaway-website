import { useContext } from 'react';
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

export async function getServerSideProps() {
    const configRes = await fetch('http://localhost:3000/api/config');
    const configData = await configRes.json();
    return {
        props: {
            configData,
        },
    };
}

export default function Home({ configData }: any) {
    const router = useRouter();
    const { cart, setCart } = useContext(AppContext);
    const modifiedCart = formatCart(cart);
    const prices = new CalculateCheckoutPrices(cart, configData);

    return (
        <>
            <div className="mx-96 my-10 flex h-screen items-center justify-between">
                <section className="w-[30rem] border-2 border-black p-10">
                    <ul>
                        {modifiedCart.map((e: any, i: number) => (
                            <li key={i} className="mb-10 flex justify-between ">
                                <span className="mr-4">
                                    {e.quantity + ' x'}
                                </span>

                                <div className="flex flex-col items-center">
                                    <span>
                                        {capitaliseFirstCharWords(e.product)}
                                    </span>
                                    <ul className="ml-10 list-disc">
                                        {e.options
                                            ? e.options.map(
                                                  (e: any, i: number) => (
                                                      <li key={i}>
                                                          {capitaliseFirstChar(
                                                              e
                                                          )}
                                                      </li>
                                                  )
                                              )
                                            : null}
                                    </ul>
                                </div>

                                <span>£{formatPrice(e.totalPrice)}</span>
                            </li>
                        ))}
                        <span className="block text-end">
                            Sub-Total: £{formatPrice(prices.subTotal)}
                        </span>
                        {prices.lowOrderFee ? (
                            <span className="block text-end">
                                Low Order Fee: £
                                {formatPrice(prices.lowOrderFee)}
                            </span>
                        ) : null}
                        <span className="block text-end">
                            Delivery Fee: £{formatPrice(prices.deliveryFee)}
                        </span>
                        <span className="block text-end">
                            Total: £{formatPrice(prices.total)}
                        </span>
                    </ul>
                </section>
                <section className="h-[45rem] w-[30rem] border-2 border-black p-10">
                    <label htmlFor="phone-number">Your Info</label>
                    <div className="mb-10 flex justify-between">
                        <PrimaryInput
                            type="number"
                            placeholder="Phone Number"
                            id="phone-number"
                            required={true}
                            inputMode="numeric"
                            onKeyPress={(e: any) => {
                                if (!/[0-9+]/.test(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            addClass={removeArrowsFromInput}
                        />
                        <PrimaryInput
                            type="email"
                            placeholder="Email (optional)"
                        />
                    </div>
                    <label htmlFor="address-line-1">Address</label>
                    <div className="mb-2 flex justify-between">
                        <PrimaryInput
                            placeholder="Address line 1"
                            id="address-line-1"
                            required={true}
                        />
                        <PrimaryInput placeholder="Address line 2 (optional)" />
                    </div>
                    <div className="mb-10 flex justify-between">
                        <PrimaryInput placeholder="City" />
                        <PrimaryInput placeholder="Postcode" />
                    </div>
                    <label htmlFor="">Order Info</label>
                    <div className="flex justify-between">
                        <textarea
                            placeholder="Leave us a note"
                            className="block h-10 resize-none border border-black"
                        />
                        <label htmlFor="include-cutlery">Include Cutlery</label>
                        <PrimaryInput type="checkbox" id="include-cutlery" />
                    </div>
                    <SecondaryButton
                        content="Place my Order"
                        onClick={() =>
                            router.push('/checkout/new-checkout-session')
                        }
                    />
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
