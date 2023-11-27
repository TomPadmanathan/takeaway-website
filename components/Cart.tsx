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

    useEffect(() => console.log(cartOpen), [cartOpen]);

    return (
        <>
            <section
                className={`z-1 fixed bottom-0 right-0 top-0 w-[30rem] border-l-2 border-black bg-white p-5 transition-all duration-500 ${
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
                                className="mb-10 flex items-center justify-between"
                            >
                                <button
                                    onClick={(): void =>
                                        deleteItemCart(index, cart, setCart)
                                    }
                                    className="mx-3 h-16 rounded-sm bg-lightergrey p-3 text-grey transition-all hover:bg-lightgrey hover:text-white"
                                >
                                    Delete
                                </button>

                                <p className="mr-4">
                                    {element.quantity + ' x'}
                                </p>

                                <div className="flex flex-col items-center">
                                    <p>
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
                <p className="block text-end">
                    Sub-Total: £{formatPrice(prices.subTotal)}
                </p>
                {prices.lowOrderFee ? (
                    <p className="block text-end">
                        Low Order Fee: £{formatPrice(prices.lowOrderFee)}
                    </p>
                ) : null}
                <p className="block text-end">
                    Delivery Fee: £{formatPrice(prices.deliveryFee)}
                </p>
                <p className="block text-end">
                    Total: £{formatPrice(prices.total)}
                </p>

                <button
                    className="h-10 border border-black p-2"
                    onClick={(): void => {
                        prices.subTotal ? router.push('/checkout') : null;
                    }}
                >
                    CheckOut
                </button>
            </section>
        </>
    );
}
