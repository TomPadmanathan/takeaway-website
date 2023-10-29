// React/Next
import { useEffect, useState } from 'react';

// Database Models
import Order from '@/database/models/Order';

// Utils
import fetchAndSetOrders from '@/utils/admin/fetchAndSetOrders';
import TableData from '@/components/adminDashboard/orders/TableData';

const tableClasses: string = 'border-collapse border border-black p-10';

interface props {
    today: boolean;
}

export default function OrdersTable({ today }: props): JSX.Element {
    const [ordersData, setOrdersData] = useState<Order[]>([]);

    useEffect(() => {
        function fetchFunction() {
            fetchAndSetOrders(setOrdersData, today);
        }
        fetchFunction();
    }, []);

    const tableHeadings: string[] = [
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
            <center>
                <table>
                    <thead>
                        <tr>
                            {tableHeadings.map(
                                (element: string, index: number) => (
                                    <td key={index} className={tableClasses}>
                                        {element}
                                    </td>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {ordersData.map((order: Order, index: number) => (
                            <tr key={index}>
                                {tableHeadings.map((heading: string) => (
                                    <TableData
                                        order={order}
                                        heading={heading}
                                        orders={[ordersData, setOrdersData]}
                                        key={heading}
                                        today={today}
                                    />
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </center>
        </>
    );
}
