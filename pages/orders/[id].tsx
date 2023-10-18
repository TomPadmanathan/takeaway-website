import { orders, order } from '@/interfaces/orders';
import getDateFromTimestamp from '@/utils/getDateFromTimestamp';
import getTimeFromTimestamp from '@/utils/getTimeFromTimestamp';
import ListItemsWithPrice from '@/components/ListItemsWithPrice';
import convertCompactedProducts from '@/utils/convertCompactedProducts';
import { config } from '@/interfaces/config';
import { useState, useEffect } from 'react';
import { NextPageContext } from 'next';
import Order from '@/database/models/Order';

interface props {
    order: Order;
    configData: config;
}

interface getServerSideProps {
    props: props;
}

export async function getServerSideProps(
    context: NextPageContext
): Promise<getServerSideProps> {
    const response: Response = await fetch(
        process.env.NEXT_PUBLIC_URL + '/api/getOrderFromId',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                orderId: context.query.id,
            }),
        }
    );
    const order: Order = await response.json();
    const configRes: Response = await fetch(
        process.env.NEXT_PUBLIC_URL + '/api/config'
    );
    const configData: config = await configRes.json();
    return {
        props: {
            order,
            configData,
        },
    };
}

export default function OrderId(props: props): JSX.Element {
    const order: Order = props.order;
    const [products, setProducts] = useState([]);

    useEffect((): void => {
        async function fetchData() {
            try {
                const result = await convertCompactedProducts(order.products);
                setProducts(result);
            } catch (error) {
                console.error('Error converting products: ', error);
            }
        }
        fetchData();
    }, [order.products]);

    return (
        <>
            <center className="mt-10 pb-10">
                <h2 className="text-4xl">Your order is:</h2>
                <h1 className="text-[80px]">{order.status.toUpperCase()}</h1>
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
                            {getDateFromTimestamp(parseInt(order.timestamp))}
                        </li>
                        <li>
                            <span className="text-slate-500">Time: </span>
                            {getTimeFromTimestamp(parseInt(order.timestamp))}
                        </li>
                        <li>
                            <span className="text-slate-500">Email: </span>
                            {order.email}
                        </li>
                        <li>
                            <span className="text-slate-500">Name: </span>
                            {order.name}
                        </li>
                        <li>
                            <span className="text-slate-500">
                                Phone Number:{' '}
                            </span>
                            {order.phoneNumber}
                        </li>
                        <li>
                            <span className="text-slate-500">City/Town: </span>
                            {order.cityTown}
                        </li>
                        <li>
                            <span className="text-slate-500">
                                Address Line 1:{' '}
                            </span>
                            {order.addressLine1}
                        </li>
                        {order.addressLine2 ? (
                            <li>
                                <span className="text-slate-500">
                                    Address Line 2:{' '}
                                </span>
                                {order.addressLine2}
                            </li>
                        ) : null}
                        <li>
                            <span className="text-slate-500">Postcode: </span>
                            {order.postCode}
                        </li>
                        <li>
                            <span className="text-slate-500">Order Id: </span>
                            {order.orderId}
                        </li>
                        {order.orderNote === 'undefined' ? null : (
                            <li>
                                <span className="text-slate-500">
                                    Order Note:
                                </span>
                                {order.orderNote}
                            </li>
                        )}
                    </ul>
                </section>
                <ListItemsWithPrice cart={products} config={props.configData} />
            </div>
        </>
    );
}
