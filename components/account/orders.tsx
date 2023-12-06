// React/Next
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Types/Interfaces
import Order from '@/database/models/Order';
import { NextRouter } from 'next/router';

// Utils
import fetchWithToken from '@/utils/JWT/fetchWithToken';
import formatPrice from '@/utils/formatPrice';
import getTimeFromTimestamp from '@/utils/getTimeFromTimestamp';
import getDateFromTimestamp from '@/utils/getDateFromTimestamp';

// Database Models
import Review from '@/database/models/Review';

// Components
import HighlightText from '@/components/HighlightText';
import capitaliseFirstChar from '@/utils/capitaliseFirstChar';

const button: string =
    'h-16 rounded-sm px-3 bg-white text-grey transition-all hover:bg-lightgrey hover:text-white';

export default function Orders(): JSX.Element {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect((): void => {
        async function fetchOrders(): Promise<void> {
            const response: Response = await fetchWithToken(
                '/api/orders/get-orders-from-user',
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            const responseJson = await response.json();
            if (!response.ok) {
                console.error(responseJson.error);
                return;
            }

            setOrders(responseJson.orders);
        }
        fetchOrders();
    }, []);

    return (
        <>
            <h1 className="py-5 text-3xl text-grey2">Orders</h1>
            {!orders.length ? (
                <p>you have not made any orders.</p>
            ) : (
                <ul>
                    {orders.map((order: Order) => (
                        <div key={order.orderId}>
                            <OrderTab order={order} />
                        </div>
                    ))}
                </ul>
            )}
        </>
    );
}

interface props {
    order: Order;
}

function OrderTab({ order }: props): JSX.Element {
    const cart = JSON.parse(order.products);
    const router: NextRouter = useRouter();
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

    useEffect((): void => {
        fetchReview();
    });

    return (
        <>
            <ul className="my-5 flex items-center justify-between rounded bg-lightergrey px-10 py-5 shadow-sm sm:justify-center sm:text-center">
                <div>
                    <li>
                        <h2 className="text-2xl text-grey2">
                            {capitaliseFirstChar(order.status)}
                        </h2>
                        <p className="text-grey">
                            {order.status === 'pending' &&
                                'Your order is pending and will be accepted shortly.'}
                            {order.status === 'accepted' &&
                                'Your order has been accepted and will be dispatched shortly.'}
                            {order.status === 'dispatched' &&
                                'Your order has been dispatched and will be with you shortly.'}
                            {order.status === 'delivered' &&
                                'Your order has been delivered. Enjoy!'}
                        </p>
                    </li>
                    <li className="py-2">
                        <p>
                            {getDateFromTimestamp(+order.timestamp)}{' '}
                            {getTimeFromTimestamp(+order.timestamp)}
                        </p>
                    </li>
                    <li>
                        <p className="text-grey2">
                            <HighlightText color="darkgrey">
                                <>
                                    {cart.length}{' '}
                                    {cart.length === 1 ? 'item' : 'items'}{' '}
                                    {' • '}
                                    <HighlightText>
                                        {'£' +
                                            formatPrice(
                                                order.totalPayment / 100
                                            )}
                                    </HighlightText>
                                </>
                            </HighlightText>
                        </p>
                    </li>
                    {order.status === 'delivered' && !review && (
                        <li className="pt-2">
                            <HighlightText>
                                <button
                                    onClick={() =>
                                        router.push('/orders/' + order.orderId)
                                    }
                                >
                                    Review your order
                                </button>
                            </HighlightText>
                        </li>
                    )}
                    <li className="hidden sm:block">
                        <button
                            className={button + 'mt-4'}
                            onClick={(): Promise<boolean> =>
                                router.push('/orders/' + order.orderId)
                            }
                        >
                            View Order
                        </button>
                    </li>
                </div>
                <li className="sm:hidden">
                    <button
                        className={button}
                        onClick={(): Promise<boolean> =>
                            router.push('/orders/' + order.orderId)
                        }
                    >
                        View Order
                    </button>
                </li>
            </ul>
        </>
    );
}
