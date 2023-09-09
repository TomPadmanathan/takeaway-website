import { order, orders } from '@/interfaces/orders';
import formatPrice from '@/utils/formatPrice';
import AdminNav from '@/components/AdminNav';

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

export default function Orders(props: props) {
    const ordersData: orders = props.ordersData;

    const tableHeadings = [
        'Time',
        'Date',
        'Name',
        'PostCode',
        'OrderId',
        '',
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
                                    More Info
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
