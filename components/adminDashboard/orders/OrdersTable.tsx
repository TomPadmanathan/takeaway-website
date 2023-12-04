// React/Next
import { useEffect, useState } from 'react';

// Database Models
import Order from '@/database/models/Order';

// Utils
import fetchAndSetOrders from '@/utils/admin/fetchAndSetOrders';
import TableData from '@/components/adminDashboard/orders/TableData';

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
    }, [today]);

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
            <div className="flex justify-center text-center text-grey">
                <div className="mb-10 overflow-hidden  rounded shadow-lg">
                    <table className="border-4 border-white bg-white">
                        <thead className="border-grey">
                            <tr>
                                {tableHeadings.map(
                                    (element: string, index: number) => (
                                        <TableCell border key={index}>
                                            {element}
                                        </TableCell>
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
                </div>
            </div>
        </>
    );
}

interface children {
    children: string | JSX.Element | null;
    border?: boolean;
    onClick?: () => void;
}
function TableCell({ children, border, onClick }: children) {
    return (
        <td className="p-1">
            <div
                className={`rounded bg-lightergrey p-10 ${
                    border && 'border-[2px] border-lightgrey text-grey2'
                } ${
                    onClick &&
                    'cursor-pointer transition-all hover:bg-lightgrey hover:text-white'
                }`}
                onClick={onClick}
            >
                <p>{children}</p>
            </div>
        </td>
    );
}
