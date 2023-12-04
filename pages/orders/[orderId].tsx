// React/Next
import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/router';

// Database Models
import Order from '@/database/models/Order';
import Review from '@/database/models/Review';

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
import HighlightText from '@/components/HighlightText';

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
                        <ReviewComponent order={order} />
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
                        <ReviewComponent order={order} />
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

function ReviewComponent({ order }: reviewProps): JSX.Element {
    const [rating, setRating] = useState<number | null>(null);
    const [ratingMessage, setRatingMessage] = useState<string>('');
    const [starHover, setStarHover] = useState<number | null>(null);
    const tailwindColors: any = tailwindConfig.theme?.colors;
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [review, setReview] = useState<Review | null>(null);

    async function fetchReview(): Promise<void> {
        const response: Response = await fetchWithToken(
            '/api/reviews/get-review-from-order?orderId=' + order.orderId,
            {
                headers: { 'Content-Type': 'application/json' },
                method: 'GET',
            }
        );
        const responseJson = await response.json();
        if (!response.ok) {
            console.error(responseJson.error);
            return;
        }
        setReview(responseJson.review);
    }

    async function handleSubmit(event: FormEvent): Promise<void> {
        event.preventDefault();

        setLoading(true);
        setError('');
        setRating(null);
        setRatingMessage('');

        const response: Response = await fetchWithToken(
            '/api/reviews/create-new-review',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId: order.orderId,
                    rating,
                    ratingMessage,
                }),
            }
        );
        const responseJson = await response.json();
        if (!response.ok) {
            setLoading(false);
            setError(responseJson.error);
            return;
        }
        setLoading(false);
        fetchReview();
    }

    useEffect((): void => {
        fetchReview();
    }, []);

    return (
        <section
            className={`h-max w-[480px] rounded bg-white p-10 shadow-lg 2xl:my-5 xs:w-[430px] 2xs:w-[360px] 3xs:w-full 3xs:px-8 4xs:px-5 ${
                review && review?.status !== 'pending' && 'hidden'
            }`}
        >
            {!review && (
                <form
                    onSubmit={handleSubmit}
                    className="grid place-items-center"
                >
                    <h2 className=" mb-3 text-xl text-grey2">
                        Hi {order.user.forename}, how was your meal?
                    </h2>
                    {error && (
                        <p>
                            <HighlightText color="red">{error}</HighlightText>
                        </p>
                    )}
                    <div className="mb-5 mt-2 flex justify-center">
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
                                            required
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
                    </div>
                    <textarea
                        className="mb-5 h-32 w-full resize-none rounded-sm bg-lightergrey p-2 focus:outline-none"
                        placeholder="Tell us more about your experience"
                        value={ratingMessage}
                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                            setRatingMessage(event.target.value)
                        }
                        required
                    />
                    <button
                        type="submit"
                        className="mr-2 h-16 rounded-sm bg-lightergrey px-3 text-grey transition-all hover:bg-lightgrey hover:text-white"
                    >
                        {loading ? 'Loading' : 'Leave Review'}
                    </button>
                </form>
            )}

            {review?.status === 'pending' && (
                <div className={`text-center text-grey2`}>
                    <h2 className="mb-2 text-2xl text-pink">
                        Thank you for your review
                    </h2>
                    <p>
                        Your review is currently pending and will be approved
                        shortly. We take all feedback onboard and use it to
                        improve our service.
                    </p>
                </div>
            )}
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
