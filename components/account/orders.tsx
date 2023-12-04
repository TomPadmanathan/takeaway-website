// React/Next
import { useEffect, useState } from 'react';

// Types/Interfaces
import Order from '@/database/models/Order';
import { useRouter, NextRouter } from 'next/router';

// Utils
import fetchWithToken from '@/utils/JWT/fetchWithToken';
import formatPrice from '@/utils/formatPrice';
import getTimeFromTimestamp from '@/utils/getTimeFromTimestamp';
import getDateFromTimestamp from '@/utils/getDateFromTimestamp';

// Components
import HighlightText from '@/components/HighlightText';

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

    return (
        <>
            <ul className="my-5 flex items-center justify-between rounded bg-lightergrey px-10 py-5 shadow-sm sm:justify-center sm:text-center">
                <div>
                    <li>
                        <h2 className="text-2xl text-grey2">
                            {order.status === 'pending' && 'Pending'}
                            {order.status === 'accepted' && 'Accepted'}
                            {order.status === 'dispatched' && 'Dispatched'}
                            {order.status === 'delivered' && 'Delivered'}
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
                    {order.status === 'delivered' && (
                        <li className="pt-2">
                            <HighlightText>
                                <button
                                    onClick={() =>
                                        router.push(
                                            '/orders/' +
                                                order.orderId +
                                                '/review'
                                        )
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