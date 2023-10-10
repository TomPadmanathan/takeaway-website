import { order, orders } from '@/interfaces/orders';
import formatPrice from '@/utils/formatPrice';
import AdminNav from '@/components/AdminNav';
import SecondaryButton from '@/components/SecondaryButton';
import capitaliseFirstChar from '@/utils/capitaliseFirstChar';
import { useState } from 'react';

export async function getServerSideProps() {
    const ordersRes = await fetch('http://localhost:3000/api/orders');
    const ordersData: orders = await ordersRes.json();
    return {
        props: {
            ordersData,
        },
    };
}

interface props {
    ordersData: orders;
}

function isolateDateFromDateTime(dateTime: string): string {
    const date = new Date(dateTime);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    return `${day.toString().padStart(2, '0')}-${month
        .toString()
        .padStart(2, '0')}-${year}`;
}
function isolateTimeFromDateTime(dateTime: string): string {
    const date = new Date(dateTime);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();

    return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

const status: string[] = ['pending', 'accepted', 'dispatched', 'delivered'];
const btnHeadings: string[] = ['Accept', 'Dispatch', 'Delivered'];

function findCorrectBtn(currentStatus: string): string {
    let correctBtnHeading: string = '';
    status.forEach((value: string, index: number) => {
        if (currentStatus === value) correctBtnHeading = btnHeadings[index];
    });
    return correctBtnHeading;
}

async function changeOrderStatus(
    id: number,
    currentStatus: string
): Promise<void> {
    let newStatus;
    status.forEach((value: string, index: number) => {
        if (value === currentStatus) newStatus = status[index + 1];
    });
    if (!newStatus) return;
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
    const [ordersData, setOrdersData] = useState(props.ordersData);

    async function fetchOrdersData(): Promise<void> {
        // Change later to wait for response from change status then update
        setTimeout(async () => {
            const ordersRes = await fetch('http://localhost:3000/api/orders');
            const ordersData: orders = await ordersRes.json();
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
                        {ordersData.map((order: order, index: number) => (
                            <tr key={index}>
                                <td className="border-collapse border p-10">
                                    {isolateTimeFromDateTime(order.DateTime)}
                                </td>
                                <td className="border-collapse border p-10">
                                    {isolateDateFromDateTime(order.DateTime)}
                                </td>
                                <td className="border-collapse border p-10">
                                    {order.Name}
                                </td>
                                <td className="border-collapse border p-10">
                                    {order.PostCode}
                                </td>
                                <td className="border-collapse border p-10">
                                    {order.OrderId}
                                </td>
                                <td className="border-collapse border p-10">
                                    {findCorrectBtn(order.Status) ? (
                                        <SecondaryButton
                                            onClick={() => {
                                                changeOrderStatus(
                                                    order.OrderId,
                                                    order.Status
                                                );
                                                fetchOrdersData();
                                            }}
                                            content={findCorrectBtn(
                                                order.Status
                                            )}
                                        />
                                    ) : null}
                                </td>
                                <td className="border-collapse border p-10">
                                    {capitaliseFirstChar(order.Status)}
                                </td>
                                <td className="border-collapse border p-10">
                                    £{formatPrice(order.TotalPayment / 100)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </center>
        </>
    );
}
