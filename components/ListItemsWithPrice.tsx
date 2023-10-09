import formatPrice from '@/utils/formatPrice';
import capitaliseFirstCharWords from '@/utils/capitaliseFirstCharWords';
import capitaliseFirstChar from '@/utils/capitaliseFirstChar';
import formatCart from '@/utils/formatCart';
import { cart, modifiedCartItem } from '@/interfaces/cart';
import CalculateCheckoutPrices from '@/utils/CalculateCheckoutPrices';
import { config } from '@/interfaces/config';

interface props {
    cart: cart;
    config: config;
}

export default function ListItemsWithPrice(props: props) {
    const modifiedCart = formatCart(props.cart);
    const prices = new CalculateCheckoutPrices(props.cart, props.config);

    return (
        <section className="w-[30rem] border-2 border-black p-10">
            <ul className="py-5">
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
        </section>
    );
}
