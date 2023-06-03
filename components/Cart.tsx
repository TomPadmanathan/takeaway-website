import { useContext } from 'react';
import { AppContext } from '@/context/AppContext';
import formatPrice from '@/utils/formatPrice';
import deleteItemCart from '@/utils/deleteItemCart';
import capitaliseFirstChar from '@/utils/capitaliseFirstChar';
import capitaliseFirstCharWords from '@/utils/capitaliseFirstCharWords';
import { useRouter } from 'next/router';
import formatCart from '@/utils/formatCart';
import CalculateCheckoutPrices from '@/utils/CalculateCheckoutPrices';

export default function ProductTab(props: any) {
    const { cart, setCart } = useContext(AppContext);
    const modifiedCart = formatCart(cart);

    const router = useRouter();
    const prices = new CalculateCheckoutPrices(cart, props.configData);

    return (
        <>
            <div
                className={`z-1 absolute right-5 top-5 w-[30rem] rounded border-2 border-black bg-white p-5 transition-all duration-500 ${
                    props.isVisible ? null : 'pointer-events-none opacity-0'
                }`}
            >
                <h2 className="text-center text-3xl">Cart</h2>
                <ul className="py-5">
                    {modifiedCart.map((e: any, i: number) => (
                        <li key={i} className="mb-10 flex justify-between ">
                            <button
                                onClick={() => deleteItemCart(i, cart, setCart)}
                                className="h-10 border border-black p-2"
                            >
                                Delete
                            </button>
                            <span className="mr-4">{e.quantity + ' x'}</span>

                            <div className="flex flex-col items-center">
                                <span>
                                    {capitaliseFirstCharWords(e.product)}
                                </span>
                                <ul className="ml-10 list-disc">
                                    {e.options
                                        ? e.options.map((e: any, i: number) => (
                                              <li key={i}>
                                                  {capitaliseFirstChar(e)}
                                              </li>
                                          ))
                                        : null}
                                </ul>
                            </div>

                            <span>£{formatPrice(e.totalPrice)}</span>
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

                <button
                    className="h-10 border border-black p-2"
                    onClick={() => {
                        prices.subTotal ? router.push('/checkout') : null;
                    }}
                >
                    CheckOut
                </button>
            </div>
        </>
    );
}