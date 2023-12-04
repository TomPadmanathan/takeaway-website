// React/Next
import React, { useContext, useState, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';

// Components
import BottomNav from '@/components/page/nav/BottomNav';
import Footer from '@/components/page/Footer';

// Types/Interfaces
import { products, product } from '@/interfaces/products';
import { productNavButton } from '@/interfaces/productNav';
import { config } from '@/interfaces/config';
import { cart } from '@/interfaces/cart';

// Context
import { AppContext } from '@/context/AppContext';

// Utils
import formatPrice from '@/utils/formatPrice';
import CalculateCheckoutPrices from '@/utils/CalculateCheckoutPrices';
import capitaliseFirstChar from '@/utils/capitaliseFirstChar';
import capitaliseFirstCharWords from '@/utils/capitaliseFirstCharWords';

// Assets
import { HiSearch, HiX } from 'react-icons/hi';
import tailwindConfig from '@/tailwind.config';
import HighlightText from '@/components/HighlightText';

interface props {
    productsData: products;
}

interface getServerSideProps {
    props: props;
}

export async function getServerSideProps(): Promise<getServerSideProps> {
    const productsRes: Response = await fetch(
        process.env.NEXT_PUBLIC_URL + '/api/products'
    );
    const productsData: products = await productsRes.json();

    return {
        props: {
            productsData,
        },
    };
}

export default function Home({ productsData }: props): JSX.Element {
    const tailwindColors: any = tailwindConfig?.theme?.colors;
    const [search, setSearch] = useState<string>('');
    const { cart } = useContext(AppContext);
    const configData: config = {
        lowOrder: {
            maxFee: +(process.env.NEXT_PUBLIC_MAX_FEE as string),
            feeLimit: +(process.env.NEXT_PUBLIC_FEE_LIMIT as string),
        },
        delivery: {
            fee: +(process.env.NEXT_PUBLIC_DELIVERY_FEE as string),
            estimatedTimeOffset: +(process.env
                .NEXT_PUBLIC_ESTIMATED_TIME_OFFSET as string),
        },
    };
    const checkoutPrices = new CalculateCheckoutPrices(cart, configData);
    const [activeProductNav, setActiveProductNav] =
        useState<productNavButton>('popular');

    const filteredData = searchProducts(search, productsData, activeProductNav);

    const productNavButtons: string[] = [
        'popular',
        'chinese',
        'japanese',
        'korean',
        'indonesian',
        'thai',
    ];

    const inputContainer: string =
        'flex items-center rounded-sm bg-lightergrey overflow-hidden';
    const inputfield: string =
        'h-14 bg-lightergrey pl-2 focus:outline-none w-80';

    return (
        <div className="bg-white">
            <BottomNav />
            <div className="mx-[25px] min-h-[900px] l:mx-10 3xs:mx-5">
                <div className="mb-32 mt-20 px-[140px] m:px-0 sm:mb-10">
                    <div className="my-4 flex h-full items-center justify-between l:block">
                        <div className={inputContainer + ' my-2'}>
                            <HiSearch
                                className="ml-4"
                                size={22}
                                color={tailwindColors.grey}
                            />
                            <input
                                placeholder="Search"
                                type="text"
                                className={inputfield}
                                value={search}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ): void => setSearch(event.target.value)}
                            ></input>
                        </div>
                        {!search && (
                            <div className="3xl:hidden">
                                {productNavButtons.map((button: any) => (
                                    <button
                                        onClick={(): void =>
                                            setActiveProductNav(button)
                                        }
                                        key={button}
                                        className={`mx-3 h-16 rounded-sm p-3 text-grey transition-all hover:bg-lightgrey hover:text-white ${
                                            activeProductNav == button
                                                ? 'bg-lightgrey text-white'
                                                : 'bg-lightergrey'
                                        }`}
                                    >
                                        {capitaliseFirstChar(button)}
                                    </button>
                                ))}
                            </div>
                        )}
                        <div className="flex items-center justify-center l:mb-10 l:w-full">
                            <p className="w-40">
                                {cart.length}{' '}
                                {cart.length == 1 ? 'item' : 'items'} - £
                                {formatPrice(checkoutPrices.subTotal)}
                            </p>
                        </div>
                    </div>

                    {!search && (
                        <div className="hidden w-full justify-center 3xl:flex">
                            <div className="flex-col text-center">
                                {productNavButtons.map((button: any) => (
                                    <button
                                        onClick={(): void =>
                                            setActiveProductNav(button)
                                        }
                                        key={button}
                                        className={`mx-3 mb-5 h-16 rounded-sm p-3 text-grey ${
                                            activeProductNav == button
                                                ? 'bg-lightgrey text-white'
                                                : 'bg-lightergrey'
                                        }`}
                                    >
                                        {capitaliseFirstChar(button)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-center">
                    <div className="mb-20 grid grid-cols-5 gap-10 3xl:grid-cols-4 xl:grid-cols-3 m:grid-cols-2 sm:grid-cols-1">
                        {filteredData.map(
                            (element: product): JSX.Element => (
                                <ProductTab
                                    product={element}
                                    key={element.product}
                                />
                            )
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

interface productTabProps {
    product: product;
}

function ProductTab(props: productTabProps): JSX.Element {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <div className="w-72 overflow-hidden rounded bg-lightergrey pb-2 text-center text-grey">
                <Image
                    src={props.product.image}
                    className="aspect-[4/3] w-72 border border-black"
                    alt={props.product.product + ' image'}
                />
                <h2 className="text-xl text-grey2">
                    {capitaliseFirstCharWords(props.product.product)}
                </h2>
                <HighlightText>
                    {'£' + formatPrice(props.product.price)}
                </HighlightText>
                <div className="flex justify-center">
                    <button
                        onClick={() => setOpen(true)}
                        className="h-10 w-28 rounded-sm bg-white transition-all hover:bg-lightgrey hover:text-white"
                    >
                        Add to cart
                    </button>
                </div>
            </div>

            <AddCartModel product={props.product} open={[open, setOpen]} />
        </>
    );
}

interface AddCartModelProps {
    open: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    product: product;
}

function AddCartModel(props: AddCartModelProps): JSX.Element {
    const tailwindColors: any = tailwindConfig?.theme?.colors;

    const { setCart } = useContext(AppContext);
    const [open, setOpen] = props.open;
    const [selectedOption, setSelectedOption] = useState<string[]>([]);
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        if (!props.product.options) return;
        const initialSelectedOption = props.product.options.map(
            (subArray: string[]) => subArray[0]
        );
        setSelectedOption(initialSelectedOption);
    }, [props.product.options]);

    function handleAddItemCart(): void {
        const newItem: products = [];

        for (let index = quantity; index !== 0; index--) {
            newItem.push({
                ...props.product,
                options: selectedOption,
            });
        }
        // Push items to cart
        newItem.forEach((element: product) =>
            setCart((prevCart: cart) => [...prevCart, element])
        );
        setOpen(false);
        if (props.product.options) {
            const resetSelectedOption = props.product.options.map(
                (subArray: string[]) => subArray[0]
            );
            setSelectedOption(resetSelectedOption);
        }
        if (quantity !== 1) setQuantity(1);
    }

    return (
        <>
            <div
                className={`fixed inset-0 ${
                    open ? 'flex items-center justify-center' : 'hidden'
                }`}
            >
                <div
                    className="absolute inset-0 bg-black opacity-20"
                    onClick={() => setOpen(false)}
                ></div>
                <div className="mx-5 flex items-center justify-center">
                    <div className="relative mx-5 flex h-[380px] w-[40rem] items-center justify-center bg-white text-grey shadow-lg sm:h-[450px]">
                        <button
                            onClick={(): void => setOpen(false)}
                            className="absolute right-2 top-2"
                        >
                            <HiX size={22} color={tailwindColors.grey} />
                        </button>
                        <div className="flex flex-col items-center">
                            <h2 className="mb-20 text-2xl">
                                {capitaliseFirstCharWords(
                                    props.product.product
                                )}
                            </h2>

                            <div className="mx-2 mb-20 flex place-items-center items-center sm:grid">
                                <div
                                    className={`${
                                        props.product.options
                                            ? 'mx-2 sm:mb-2'
                                            : ''
                                    }`}
                                >
                                    <button
                                        onClick={(): void => {
                                            quantity > 1
                                                ? setQuantity(quantity - 1)
                                                : null;
                                        }}
                                    >
                                        -
                                    </button>
                                    <span className="mx-4">{quantity}</span>
                                    <button
                                        onClick={(): void =>
                                            setQuantity(quantity + 1)
                                        }
                                    >
                                        +
                                    </button>
                                </div>

                                {props.product.options &&
                                    props.product.options.map(
                                        (subArray: any, index: number) => (
                                            <div
                                                className="mx-2 bg-lightergrey pr-3 sm:mb-2"
                                                key={subArray}
                                            >
                                                <select
                                                    onChange={(
                                                        event: ChangeEvent<HTMLSelectElement>
                                                    ) => {
                                                        const updatedOptions =
                                                            selectedOption
                                                                ? [
                                                                      ...selectedOption,
                                                                  ]
                                                                : [];
                                                        updatedOptions[index] =
                                                            event.target.value;
                                                        setSelectedOption(
                                                            updatedOptions
                                                        );
                                                    }}
                                                    value={
                                                        selectedOption
                                                            ? selectedOption[
                                                                  index
                                                              ]
                                                            : ''
                                                    }
                                                    className="bg-lightergrey py-2 pl-3"
                                                >
                                                    {subArray.map(
                                                        (element: string) => (
                                                            <option
                                                                key={element}
                                                            >
                                                                {capitaliseFirstChar(
                                                                    element
                                                                )}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                        )
                                    )}
                            </div>

                            <button
                                onClick={(): void => handleAddItemCart()}
                                className="h-10 w-32 rounded-sm bg-lightergrey transition-all hover:bg-lightgrey hover:text-white"
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function searchProducts(
    query: string,
    products: products,
    activeProductNav: productNavButton
): products {
    return query
        ? products.filter((element: product): boolean => {
              const productName: string = element.product.toLowerCase();
              const category: string = element.category
                  .map((currentValue: string): string =>
                      currentValue.toLowerCase()
                  )
                  .join(' ');
              return (
                  productName.includes(query.toLowerCase()) ||
                  category.includes(query.toLowerCase())
              );
          })
        : products.filter((element: product): boolean =>
              element.category.includes(activeProductNav)
          );
}
