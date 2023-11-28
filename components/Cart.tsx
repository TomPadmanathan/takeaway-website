// React/Next
import { useContext, useEffect } from 'react';
import { NextRouter, useRouter } from 'next/router';

// Context
import { AppContext } from '@/context/AppContext';

// Utils
import formatPrice from '@/utils/formatPrice';
import capitaliseFirstChar from '@/utils/capitaliseFirstChar';
import capitaliseFirstCharWords from '@/utils/capitaliseFirstCharWords';
import formatCart from '@/utils/formatCart';
import CalculateCheckoutPrices from '@/utils/CalculateCheckoutPrices';

// Components
import SecondaryButton from '@/components/SecondaryButton';
import HighlightText from '@/components/HighlightText';

// Types/Interfaces
import { config } from '@/interfaces/config';
import { Dispatch, SetStateAction } from 'react';

// Assets
import { HiX } from 'react-icons/hi';

import {
    modifiedCartItem,
    modifiedCart,
    cart,
    setCart,
    cartItem,
} from '@/interfaces/cart';

interface props {
    cartOpen: [
        cartOpen: boolean,
        setCartOpen: Dispatch<SetStateAction<boolean>>
    ];
    configData: config;
}

export default function Cart(props: props): JSX.Element {
    const { cart, setCart } = useContext(AppContext);
    const [cartOpen, setCartOpen] = props.cartOpen;
    const modifiedCart: modifiedCart = formatCart(cart);

    const router: NextRouter = useRouter();
    const prices = new CalculateCheckoutPrices(cart, props.configData);

    function deleteItemCart(index: number, cart: cart, setCart: setCart): void {
        const updatedCart = cart.filter(
            (element: cartItem, secondIndex: number) => secondIndex !== index
        );
        setCart(updatedCart);
        if (updatedCart.length === 0) localStorage.removeItem('cart');
    }

    return (
        <>
            <section
                className={`fixed bottom-0 right-0 top-0 w-[30rem] bg-white p-5 shadow-xl transition-all duration-500 ${
                    cartOpen ? 'translate-x-0' : ' translate-x-[500px]'
                }`}
            >
                <button
                    onClick={(): void => setCartOpen(false)}
                    className="absolute right-2 top-2"
                >
                    <HiX />
                </button>
                <h2 className="text-center text-3xl">Cart</h2>
                <ul className="py-5">
                    {modifiedCart.map(
                        (element: modifiedCartItem, index: number) => (
                            <li
                                key={index}
                                className="mb-2 flex items-center justify-between overflow-hidden rounded bg-lightergrey p-5"
                            >
                                <button
                                    onClick={(): void =>
                                        deleteItemCart(index, cart, setCart)
                                    }
                                    className="mr-2 h-16 rounded-sm bg-white p-3 text-grey transition-all hover:bg-lightgrey hover:text-white"
                                >
                                    Delete
                                </button>

                                <p className="w-10 text-grey">
                                    {element.quantity + ' x'}
                                </p>

                                <div className="flex w-[190px] flex-col items-center">
                                    <p className="text-center text-grey2">
                                        {capitaliseFirstCharWords(
                                            element.product
                                        )}
                                    </p>
                                    <ul className="ml-10 list-disc">
                                        {element.options &&
                                        Array.isArray(element.options)
                                            ? element.options.map(
                                                  (
                                                      option: string[],
                                                      index: number
                                                  ) => {
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
                                                              <li
                                                                  key={index}
                                                                  className="text-grey"
                                                              >
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
                                <div className="w-16 text-center">
                                    <HighlightText>
                                        {'£' + formatPrice(element.totalPrice)}
                                    </HighlightText>
                                </div>
                            </li>
                        )
                    )}
                </ul>
                <div className="flex justify-between">
                    <button
                        className="mx-3 h-16 rounded-sm bg-lightergrey p-3 text-grey transition-all hover:bg-lightgrey hover:text-white"
                        onClick={(): void => {
                            prices.subTotal ? router.push('/checkout') : null;
                        }}
                    >
                        CheckOut
                    </button>
                    <div className="text-grey2">
                        <p className="block text-end">
                            Sub-Total:
                            <HighlightText>
                                {' £' + formatPrice(prices.subTotal)}
                            </HighlightText>
                        </p>
                        {prices.lowOrderFee ? (
                            <p className="block text-end">
                                Low Order Fee:
                                <HighlightText>
                                    {' £' + formatPrice(prices.lowOrderFee)}
                                </HighlightText>
                            </p>
                        ) : null}
                        <p className="block text-end">
                            Delivery Fee:
                            <HighlightText>
                                {' £' + formatPrice(prices.deliveryFee)}
                            </HighlightText>
                        </p>
                        <p className="block text-end">
                            Total:
                            <HighlightText>
                                {' £' + formatPrice(prices.total)}
                            </HighlightText>
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
