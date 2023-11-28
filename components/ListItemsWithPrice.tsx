// Utils
import formatPrice from '@/utils/formatPrice';
import capitaliseFirstCharWords from '@/utils/capitaliseFirstCharWords';
import capitaliseFirstChar from '@/utils/capitaliseFirstChar';
import formatCart from '@/utils/formatCart';
import CalculateCheckoutPrices from '@/utils/CalculateCheckoutPrices';

// Componets
import HighlightText from './HighlightText';

// Types/Interfaces
import { config } from '@/interfaces/config';
import { cart, modifiedCartItem } from '@/interfaces/cart';
import { modifiedCart } from '@/interfaces/cart';

interface props {
    cart: cart;
    config: config;
}

export default function ListItemsWithPrice(props: props): JSX.Element {
    const modifiedCart: modifiedCart = formatCart(props.cart);
    const prices = new CalculateCheckoutPrices(props.cart, props.config);

    return (
        <section className="mb-10 w-[30rem] border-2 border-black p-10">
            {/* <ul className="py-5">
                {modifiedCart.map(
                    (element: modifiedCartItem, index: number) => (
                        <li key={index} className="mb-10 flex justify-between ">
                            <span className="mr-4">
                                {element.quantity + ' x'}
                            </span>

                            <div className="flex flex-col items-center">
                                <span>
                                    {capitaliseFirstCharWords(element.product)}
                                </span>
                                <ul className="ml-10 list-disc">
                                    {element.options &&
                                    Array.isArray(element.options)
                                        ? element.options.map(
                                              (
                                                  option: string[] | string,
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
            </ul> */}
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
                                className="mr-2 h-16 rounded-sm bg-white px-3 text-grey transition-all hover:bg-lightgrey hover:text-white 3xs:h-12 3xs:px-2"
                            >
                                Delete
                            </button>

                            <p className="w-10 text-grey">
                                {element.quantity + ' x'}
                            </p>

                            <div className="flex w-[190px] flex-col items-center">
                                <p className="text-center text-grey2">
                                    {capitaliseFirstCharWords(element.product)}
                                </p>
                                <ul className="ml-10 list-disc">
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
    );
}
