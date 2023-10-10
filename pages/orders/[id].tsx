import { order, orders } from '@/interfaces/orders';
import isolateDateFromDateTime from '@/utils/isolateDateFromDateTime';
import isolateTimeFromDateTime from '@/utils/isolateTimeFromDateTime';
import ListItemsWithPrice from '@/components/ListItemsWithPrice';
import convertCompactedProducts from '@/utils/convertCompactedProducts';
import { config } from '@/interfaces/config';
import { useState, useEffect } from 'react';

export async function getServerSideProps(context: any) {
    const response: Response = await fetch(
        'http://localhost:3000/api/getOrderFromId',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                orderId: JSON.stringify(context.query.id),
            }),
        }
    );
    const order: orders = await response.json();
    const configRes: Response = await fetch('http://localhost:3000/api/config');
    const configData: config = await configRes.json();
    return {
        props: {
            order,
            configData,
        },
    };
}

function calculateEstimatedDelvieryTime(timeString: string): string {
    const [hours, minutes, seconds]: number[] = timeString
        .split(':')
        .map(Number);
    const totalMinutes: number = hours * 60 + minutes + 45;
    const newHours: number = Math.floor(totalMinutes / 60);
    const newMinutes: number = totalMinutes % 60;
    const resultTime: string = `${String(newHours).padStart(2, '0')}:${String(
        newMinutes
    ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    return resultTime;
}

interface props {
    order: order[];
    configData: config;
}

export default function orderId(props: props) {
    const order: order = props.order[0];
    const [products, setProducts] = useState([]);

    useEffect((): void => {
        async function fetchData() {
            try {
                const result = await convertCompactedProducts(order.Products);
                setProducts(result);
            } catch (error) {
                console.error('Error converting products: ', error);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <center className="mt-10 pb-10">
                <h2 className="text-4xl">Your order is:</h2>
                <h1 className="text-[80px]">{order.Status.toUpperCase()}</h1>
                {order.Status === 'delivered' ? null : (
                    <>
                        <h2>Estimated Delivery Time:</h2>
                        <h2>
                            {calculateEstimatedDelvieryTime(
                                isolateTimeFromDateTime(order.DateTime)
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
                            {isolateDateFromDateTime(order.DateTime)}
                        </li>
                        <li>
                            <span className="text-slate-500">Time: </span>
                            {isolateTimeFromDateTime(order.DateTime)}
                        </li>
                        <li>
                            <span className="text-slate-500">Email: </span>
                            {order.Email}
                        </li>
                        <li>
                            <span className="text-slate-500">Name: </span>
                            {order.Name}
                        </li>
                        <li>
                            <span className="text-slate-500">
                                Phone Number:{' '}
                            </span>
                            {order.PhoneNumber}
                        </li>
                        <li>
                            <span className="text-slate-500">City/Town: </span>
                            {order.CityTown}
                        </li>
                        <li>
                            <span className="text-slate-500">
                                Address Line 1:{' '}
                            </span>
                            {order.AddressLine1}
                        </li>
                        {order.AddressLine2 ? (
                            <li>
                                <span className="text-slate-500">
                                    Address Line 2:{' '}
                                </span>
                                {order.AddressLine2}
                            </li>
                        ) : null}
                        <li>
                            <span className="text-slate-500">Postcode: </span>
                            {order.PostCode}
                        </li>
                        <li>
                            <span className="text-slate-500">Order Id: </span>
                            {order.OrderId}
                        </li>
                        {order.OrderNote === 'undefined' ? null : (
                            <li>
                                <span className="text-slate-500">
                                    Order Note:
                                </span>
                                {order.OrderNote}
                            </li>
                        )}
                    </ul>
                </section>
                {products.length > 0 && (
                    <ListItemsWithPrice
                        cart={products}
                        config={props.configData}
                    />
                )}
            </div>
        </>
    );
}
