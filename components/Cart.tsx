import { useContext } from 'react';
import { AppContext } from '@/context/AppContext';
import formatPrice from '@/utils/formatPrice';
import deleteItemCart from '@/utils/deleteItemCart';
import capitaliseFirstChar from '@/utils/capitaliseFirstChar';
import capitaliseFirstCharWords from '@/utils/capitaliseFirstCharWords';
import { useRouter } from 'next/router';
import formatCart from '@/utils/formatCart';
import CalculateCheckoutPrices from '@/utils/CalculateCheckoutPrices';
import SecondaryButton from '@/components/SecondaryButton';
import { config } from '@/interfaces/config';
import { modifiedCartItem } from '@/interfaces/cart';

interface props {
    isVisible: boolean;
    configData: config;
}

export default function Cart(props: props) {
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
                    {modifiedCart.map(
                        (element: modifiedCartItem, index: number) => (
                            <li
                                key={index}
                                className="mb-10 flex justify-between "
                            >
                                <SecondaryButton
                                    onClick={() =>
                                        deleteItemCart(index, cart, setCart)
                                    }
                                    content="Delete"
                                />

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
                                        {element.options &&
                                        Array.isArray(element.options)
                                            ? element.options.map(
                                                  (option, index) => {
                                                      if (
                                                          Array.isArray(option)
                                                      ) {
                                                          return (
                                                              <li key={index}>
                                                                  {option
                                                                      .map(
                                                                          item =>
                                                                              capitaliseFirstChar(
                                                                                  item
                                                                              )
                                                                      )
                                                                      .join(
                                                                          ', '
                                                                      )}
                                                              </li>
                                                          );
                                                      } else {
                                                          return (
                                                              <li key={index}>
                                                                  {capitaliseFirstChar(
                                                                      option
                                                                  )}{' '}
                                                              </li>
                                                          );
                                                      }
                                                  }
                                              )
                                            : null}
                                    </ul>
                                </div>

                                <span>£{formatPrice(element.totalPrice)}</span>
                            </li>
                        )
                    )}
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
