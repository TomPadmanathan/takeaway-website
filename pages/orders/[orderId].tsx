// React/Next
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Database Models
import Order from '@/database/models/Order';

// Utils
import getDateFromTimestamp from '@/utils/getDateFromTimestamp';
import getTimeFromTimestamp from '@/utils/getTimeFromTimestamp';
import convertCompactedProducts from '@/utils/convertCompactedProducts';
import fetchWithToken from '@/utils/JWT/fetchWithToken';

// Components
import ListItemsWithPrice from '@/components/ListItemsWithPrice';
import BottomNav from '@/components/page/nav/BottomNav';
import Footer from '@/components/page/Footer';

// Types/Interfaces
import { NextRouter } from 'next/router';

// Assets
import { HiStar } from 'react-icons/hi';
import tailwindConfig from '@/tailwind.config';

export default function OrderId(): JSX.Element {
    const [order, setOrder] = useState<Order | null>();
    const [products, setProducts] = useState([]);
    const router: NextRouter = useRouter();
    const [token, setToken] = useState<string | null>();
    const [error, setError] = useState<string>();

    useEffect((): void => {
        const token = localStorage.getItem('token');
        if (token) setToken(token);
    }, []);

    useEffect((): void => {
        async function fetchOrder(): Promise<void> {
            const response: Response = await fetchWithToken(
                process.env.NEXT_PUBLIC_URL + '/api/getOrderFromId',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        orderId: router.query.orderId,
                    }),
                }
            );
            const responseJson = await response.json();
            if (!response.ok) {
                setError(responseJson.error);
                return;
            }
            setOrder(responseJson.order);

            const result = await convertCompactedProducts(
                responseJson.order.products
            );
            setProducts(result);
        }
        if (router.isReady) fetchOrder();
    }, [router.isReady, router.query.orderId]);
    if (!error && order)
        return (
            <>
                <BottomNav />
                <section className="my-10 text-center">
                    <h2 className="mb-4 text-4xl xs:text-3xl 3xs:text-2xl">
                        Your order{' '}
                        {order.status === 'pending' ? 'is' : 'has been'}:
                    </h2>
                    <h1 className="text-8xl xs:text-7xl 3xs:text-6xl">
                        {order.status.toUpperCase()}
                    </h1>
                    {order.status !== 'delivered' && (
                        <>
                            <h2>Estimated Delivery Time:</h2>
                            <h2>
                                {getTimeFromTimestamp(
                                    parseInt(order.timestamp) +
                                        +(process.env
                                            .NEXT_PUBLIC_ESTIMATED_TIME_OFFSET as string) *
                                            60000
                                )}
                            </h2>
                        </>
                    )}
                </section>
                <div
                    className={`mx-96 mb-20 flex place-items-center ${
                        order.status === 'delivered'
                            ? 'justify-between'
                            : 'justify-around'
                    } 5xl:mx-60 4xl:mx-28 3xl:mx-0 3xl:justify-around 2xl:grid`}
                >
                    <div className="hidden 2xl:block 3xs:bg-lightergrey">
                        <Review order={order} />
                    </div>
                    <section className="h-[720px] w-[480px] rounded bg-white p-5 shadow-lg 2xl:my-5 xs:h-auto xs:w-[430px] 2xs:w-[360px] 3xs:w-screen">
                        <ul className="text-2xl leading-10">
                            <ListItem
                                title="Date Time"
                                content={
                                    getDateFromTimestamp(
                                        parseInt(order.timestamp)
                                    ) +
                                    ' ' +
                                    getTimeFromTimestamp(
                                        parseInt(order.timestamp)
                                    )
                                }
                            />

                            <ListItem
                                title="Name"
                                content={
                                    order.user.forename +
                                    ' ' +
                                    order.user.surname
                                }
                            />
                            <ListItem
                                title="Phone Number"
                                content={order.user.phoneNumber}
                            />
                            <ListItem
                                title="City/Town"
                                content={order.user.cityTown}
                            />

                            <ListItem
                                title="Address Line 1"
                                content={order.user.addressLine1}
                            />
                            {order.user.addressLine2 && (
                                <ListItem
                                    title="Address Line 2"
                                    content={order.user.addressLine2}
                                />
                            )}
                            <ListItem
                                title="PostCode"
                                content={order.user.postcode}
                            />
                            <ListItem
                                title="Order Id"
                                content={order.orderId}
                            />

                            {order.orderNote && (
                                <ListItem
                                    title="Order Note"
                                    content={order.orderNote}
                                />
                            )}
                        </ul>
                    </section>
                    <div className="h-[720px] 2xl:hidden">
                        <Review order={order} />
                    </div>
                    <div className="2xl:my-5">
                        <ListItemsWithPrice cart={products} />
                    </div>
                </div>
                <Footer />
            </>
        );
    else return <>{error && <p>error</p>}</>;
}
interface reviewProps {
    order: Order;
}

function Review({ order }: reviewProps): JSX.Element {
    const [rating, setRating] = useState<number | null>(null);
    const [starHover, setStarHover] = useState<number | null>(null);
    const tailwindColors: any = tailwindConfig.theme?.colors;

    return (
        <section
            className={`h-max w-[480px] rounded bg-white p-10 shadow-lg 2xl:my-5 xs:w-[430px] 2xs:w-[360px] 3xs:w-full 3xs:px-8 4xs:px-5 ${
                order.status !== 'delivered' && 'hidden'
            }`}
        >
            <div className="grid place-items-center">
                <h2 className=" text-xl text-grey2">
                    Hi {order.user.forename}, how was your meal?
                </h2>
                <form className="my-5 flex justify-center">
                    {new Array(5)
                        .fill(0)
                        .map((star: unknown, index: number) => {
                            const currentRating: number = index + 1;

                            return (
                                <label key={index}>
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={currentRating}
                                        onClick={(): void => {
                                            if (rating === currentRating) {
                                                setRating(null);
                                                return;
                                            }
                                            setRating(currentRating);
                                        }}
                                        className="hidden"
                                    />
                                    <HiStar
                                        color={
                                            currentRating <=
                                            ((starHover as number) ||
                                                (rating as number))
                                                ? tailwindColors.yellow
                                                : tailwindColors.lightergrey
                                        }
                                        className="cursor-pointer"
                                        size={32}
                                        onMouseEnter={(): void =>
                                            setStarHover(currentRating)
                                        }
                                        onMouseLeave={(): void =>
                                            setStarHover(null)
                                        }
                                    />
                                </label>
                            );
                        })}
                </form>
                <textarea
                    className="mb-5 h-32 w-full resize-none rounded-sm bg-lightergrey p-2 focus:outline-none"
                    placeholder="Tell us more about your experience"
                />
                <button
                    type="submit"
                    className="mr-2 h-16 rounded-sm bg-lightergrey px-3 text-grey transition-all hover:bg-lightgrey hover:text-white"
                >
                    Leave Review
                </button>
            </div>
        </section>
    );
}

interface ListItemProps {
    title: string;
    content: string | JSX.Element;
}

function ListItem({ title, content }: ListItemProps) {
    return (
        <li className="my-3">
            <p className="text-lg leading-3 text-grey2">{title}: </p>
            <p className="my-2 w-full rounded-sm bg-lightergrey px-2 text-grey">
                {content}
            </p>
        </li>
    );
}
