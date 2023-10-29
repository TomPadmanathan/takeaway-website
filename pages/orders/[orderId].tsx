// React/Next
import { useState, useEffect } from 'react';
import { NextPageContext } from 'next';

// Database Models
import Order from '@/database/models/Order';

// Utils
import getDateFromTimestamp from '@/utils/getDateFromTimestamp';
import getTimeFromTimestamp from '@/utils/getTimeFromTimestamp';
import convertCompactedProducts from '@/utils/convertCompactedProducts';
import fetchWithToken from '@/utils/JWT/fetchWithToken';

// Components
import ListItemsWithPrice from '@/components/ListItemsWithPrice';

// Types/Interfaces
import { config } from '@/interfaces/config';
import { NextRouter, useRouter } from 'next/router';
import SecondaryButton from '@/components/SecondaryButton';

interface props {
    configData: config;
}

interface getServerSideProps {
    props: props;
}

export async function getServerSideProps(): Promise<getServerSideProps> {
    const configRes: Response = await fetch(
        process.env.NEXT_PUBLIC_URL + '/api/config'
    );
    const configData: config = await configRes.json();
    return {
        props: {
            configData,
        },
    };
}

export default function OrderId(props: props): JSX.Element {
    const [order, setOrder] = useState<Order | null>();
    const [products, setProducts] = useState([]);
    const router: NextRouter = useRouter();
    const [token, setToken] = useState<string | null>();

    useEffect((): void => {
        const token = localStorage.getItem('token');
        if (token) setToken(token);
    });

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
                console.error(responseJson.error);
                return;
            }
            setOrder(responseJson.order);

            const result = await convertCompactedProducts(
                responseJson.order.products
            );
            setProducts(result);
        }
        fetchOrder();
    }, []);

    if (order)
        return (
            <>
                <center className="mt-10 pb-10">
                    <h2 className="text-4xl">Your order is:</h2>
                    <h1 className="text-[80px]">
                        {order.status.toUpperCase()}
                    </h1>
                    {order.status === 'delivered' ? null : (
                        <>
                            <h2>Estimated Delivery Time:</h2>
                            <h2>
                                {getTimeFromTimestamp(
                                    parseInt(order.timestamp) +
                                        props.configData.delivery
                                            .estimatedTimeOffset *
                                            60000
                                )}
                            </h2>
                        </>
                    )}
                </center>
                <div className="mx-96 flex justify-between">
                    <section className="h-[35rem] w-[30rem] border-2 border-black p-10">
                        <ul className="text-2xl leading-10">
                            <li>
                                <span className="text-slate-500">Date: </span>
                                {getDateFromTimestamp(
                                    parseInt(order.timestamp)
                                )}
                            </li>
                            <li>
                                <span className="text-slate-500">Time: </span>
                                {getTimeFromTimestamp(
                                    parseInt(order.timestamp)
                                )}
                            </li>
                            <li>
                                <span className="text-slate-500">Email: </span>
                                {order.user.email}
                            </li>
                            <li>
                                <span className="text-slate-500">Name: </span>
                                {order.user.forename + ' ' + order.user.surname}
                            </li>
                            <li>
                                <span className="text-slate-500">
                                    Phone Number:{' '}
                                </span>
                                {order.user.phoneNumber}
                            </li>
                            <li>
                                <span className="text-slate-500">
                                    City/Town:{' '}
                                </span>
                                {order.user.cityTown}
                            </li>
                            <li>
                                <span className="text-slate-500">
                                    Address Line 1:{' '}
                                </span>
                                {order.user.addressLine1}
                            </li>
                            {order.user.addressLine2 ? (
                                <li>
                                    <span className="text-slate-500">
                                        Address Line 2:{' '}
                                    </span>
                                    {order.user.addressLine2}
                                </li>
                            ) : null}
                            <li>
                                <span className="text-slate-500">
                                    Postcode:{' '}
                                </span>
                                {order.user.postcode}
                            </li>
                            <li>
                                <span className="text-slate-500">
                                    Order Id:{' '}
                                </span>
                                {order.orderId}
                            </li>
                            {order.orderNote ? (
                                <li>
                                    <span className="text-slate-500">
                                        Order Note:
                                    </span>
                                    {order.orderNote}
                                </li>
                            ) : null}
                        </ul>
                    </section>
                    <ListItemsWithPrice
                        cart={products}
                        config={props.configData}
                    />
                </div>
            </>
        );

    if (!token)
        return (
            <>
                <h1>Please login to view this page.</h1>
                <SecondaryButton
                    content="Login"
                    onClick={(): void => {
                        router.push({
                            pathname: '/auth/login',
                            query: {
                                url: `${process.env.NEXT_PUBLIC_URL}${router.asPath}`,
                            },
                        });
                    }}
                />
            </>
        );
    return (
        <>
            <h1>You are not logged in as the user who made this order.</h1>
        </>
    );
}
