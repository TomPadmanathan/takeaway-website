// Utils
import formatPrice from '@/utils/formatPrice';
import capitaliseFirstCharWords from '@/utils/capitaliseFirstCharWords';
import capitaliseFirstChar from '@/utils/capitaliseFirstChar';
import formatCart from '@/utils/formatCart';
import CalculateCheckoutPrices from '@/utils/CalculateCheckoutPrices';

// Componets
import HighlightText from './HighlightText';

// Types/Interfaces
import { cart, modifiedCartItem, modifiedCart } from '@/interfaces/cart';
import { NextRouter } from 'next/router';

// React/Next
import { useRouter } from 'next/router';

interface props {
    cart: cart;
}

export default function ListItemsWithPrice(props: props): JSX.Element {
    const modifiedCart: modifiedCart = formatCart(props.cart);
    const prices = new CalculateCheckoutPrices(props.cart);
    const router: NextRouter = useRouter();

    return (
        <section className="relative h-[720px] w-[480px] rounded bg-white p-5 text-center shadow-lg xs:h-full xs:w-[430px] xs:shadow-none 2xs:w-[360px] 3xs:w-screen ">
            <h2 className="py-4 text-center text-2xl text-grey2">Your Order</h2>
            <ul className="py-5">
                {modifiedCart.map(
                    (element: modifiedCartItem, index: number) => (
                        <li
                            key={index}
                            className="mb-2 flex items-center justify-between overflow-hidden rounded bg-lightergrey p-5"
                        >
                            <p className="w-10 text-grey">
                                {element.quantity + ' x'}
                            </p>

                            <div className="flex w-[190px] flex-col items-center">
                                <p className="text-center text-grey2">
                                    {capitaliseFirstCharWords(element.product)}
                                </p>
                                <ul className="w-full list-inside list-disc">
                                    {element.options &&
                                    Array.isArray(element.options)
                                        ? element.options.map(
                                              (
                                                  option: string[],
                                                  index: number
                                              ) => {
                                                  if (Array.isArray(option)) {
                                                      return (
                                                          <li key={index}>
                                                              {option
                                                                  .map(item =>
                                                                      capitaliseFirstChar(
                                                                          item
                                                                      )
                                                                  )
                                                                  .join(', ')}
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
            <div className="absolute bottom-0 left-0 w-full p-5 xs:static">
                <div className="flex items-center justify-between">
                    {router.asPath === '/checkout' ? (
                        <button
                            className="h-16 rounded-sm bg-lightergrey px-3 text-grey transition-all hover:bg-lightgrey hover:text-white"
                            onClick={(): Promise<boolean> =>
                                router.push('/order')
                            }
                        >
                            Edit Order
                        </button>
                    ) : (
                        <div></div>
                    )}
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
            </div>
        </section>
    );
}
