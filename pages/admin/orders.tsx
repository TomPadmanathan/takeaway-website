import { order, orders } from '@/interfaces/orders';
import formatPrice from '@/utils/formatPrice';
import AdminNav from '@/components/AdminNav';
import SecondaryButton from '@/components/SecondaryButton';
import capitaliseFirstChar from '@/utils/capitaliseFirstChar';
import { useState } from 'react';
import getDateFromTimestamp from '@/utils/getDateFromTimestamp';
import getTimeFromTimestamp from '@/utils/getTimeFromTimestamp';
import Order from '@/database/models/Order';

export async function getServerSideProps() {
    const ordersRes = await fetch(process.env.NEXT_PUBLIC_URL + '/api/orders');
    const ordersData: Order[] = await ordersRes.json();
    return {
        props: {
            ordersData,
        },
    };
}

interface props {
    ordersData: Order[];
}

const status: string[] = ['pending', 'accepted', 'dispatched', 'delivered'];
const btnHeadings: string[] = ['Accept', 'Dispatch', 'Delivered'];

function findCorrectBtn(currentStatus: string): string {
    let correctBtnHeading: string = '';
    status.forEach((value: string, index: number): void => {
        if (currentStatus === value) correctBtnHeading = btnHeadings[index];
    });
    return correctBtnHeading;
}

async function changeOrderStatus(
    id: number,
    currentStatus: string
): Promise<void> {
    let newStatus;
    status.forEach((value: string, index: number): void => {
        if (value === currentStatus) newStatus = status[index + 1];
    });
    if (!newStatus) {
        console.error('New status is undefined');
        return;
    }
    await fetch('/api/changeOrderStatus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: id,
            status: newStatus,
        }),
    });
}

export default function Orders(props: props) {
    const [ordersData, setOrdersData] = useState<Order[]>(props.ordersData);

    async function fetchOrdersData(): Promise<void> {
        // Change later to wait for response from change status then update
        setTimeout(async () => {
            const ordersRes: Response = await fetch(
                process.env.NEXT_PUBLIC_URL + '/api/orders'
            );
            const ordersData: Order[] = await ordersRes.json();
            setOrdersData(ordersData);
        }, 50);
    }

    const tableHeadings = [
        'Time',
        'Date',
        'Name',
        'PostCode',
        'Order Id',
        'Change Status',
        'Status',
        'Total Price',
    ];

    return (
        <>
            <AdminNav />
            <center>
                <table className="border-collapse border p-10">
                    <thead>
                        <tr>
                            {tableHeadings.map(
                                (element: string, index: number) => (
                                    <td
                                        key={index}
                                        className="border-collapse border p-10"
                                    >
                                        {element}
                                    </td>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {ordersData.map((order: Order, index: number) => (
                            <tr key={index}>
                                <td className="border-collapse border p-10">
                                    {getTimeFromTimestamp(
                                        parseInt(order.timestamp)
                                    )}
                                </td>
                                <td className="border-collapse border p-10">
                                    {getDateFromTimestamp(
                                        parseInt(order.timestamp)
                                    )}
                                </td>
                                <td className="border-collapse border p-10">
                                    {order.name}
                                </td>
                                <td className="border-collapse border p-10">
                                    {order.postCode}
                                </td>
                                <td className="border-collapse border p-10">
                                    {order.orderId}
                                </td>
                                <td className="border-collapse border p-10">
                                    {findCorrectBtn(order.status) ? (
                                        <SecondaryButton
                                            onClick={(): void => {
                                                changeOrderStatus(
                                                    order.orderId,
                                                    order.status
                                                );
                                                fetchOrdersData();
                                            }}
                                            content={findCorrectBtn(
                                                order.status
                                            )}
                                        />
                                    ) : null}
                                </td>
                                <td className="border-collapse border p-10">
                                    {capitaliseFirstChar(order.status)}
                                </td>
                                <td className="border-collapse border p-10">
                                    £{formatPrice(order.totalPayment / 100)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </center>
        </>
    );
}
