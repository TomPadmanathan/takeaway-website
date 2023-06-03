import { useContext } from 'react';
import { AppContext } from '@/context/AppContext';
import formatCart from '@/utils/formatCart';
import capitaliseFirstChar from '@/utils/capitaliseFirstChar';
import capitaliseFirstCharWords from '@/utils/capitaliseFirstCharWords';
import formatPrice from '@/utils/formatPrice';

export default function Home() {
    const { cart, setCart } = useContext(AppContext);
    const modifiedCart = formatCart(cart);

    return (
        <>
            <div className="w-[30rem] border-2 border-black p-10">
                <ul>
                    {modifiedCart.map((e: any, i: number) => (
                        <li key={i} className="mb-10 flex justify-between ">
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
            </div>
        </>
    );
}
