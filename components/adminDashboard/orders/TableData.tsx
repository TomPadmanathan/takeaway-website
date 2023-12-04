// React/Next
import { useRouter } from 'next/navigation';

// Database Models
import Order from '@/database/models/Order';

// Utils
import formatPrice from '@/utils/formatPrice';
import capitaliseFirstChar from '@/utils/capitaliseFirstChar';
import getDateFromTimestamp from '@/utils/getDateFromTimestamp';
import getTimeFromTimestamp from '@/utils/getTimeFromTimestamp';
import changeOrderStatus from '@/utils/admin/changeOrderStatus';
import findCorrectBtn from '@/utils/admin/findCorrectButton';
import fetchAndSetOrders from '@/utils/admin/fetchAndSetOrders';

// Components
import TableCell from '@/components/adminDashboard/TableCell';

// Types/Interfaces
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface props {
    order: Order;
    heading: string;
    orders: [Order[], React.Dispatch<React.SetStateAction<Order[]>>];
    today: boolean;
}

const tableClasses: string = 'border-collapse border border-black p-10';

export default function TableData({
    order,
    heading,
    orders,
    today,
}: props): JSX.Element | null {
    const router: AppRouterInstance = useRouter();
    let returnData: string | JSX.Element | null;

    const [ordersData, setOrdersData] = orders;

    async function fetchOrdersData(): Promise<void> {
        // Change later to wait for response from change status then update
        setTimeout(async (): Promise<void> => {
            fetchAndSetOrders(setOrdersData, today);
        }, 50);
    }
    switch (heading) {
        case 'Time':
            returnData = getTimeFromTimestamp(parseInt(order.timestamp));
            break;
        case 'Date':
            returnData = getDateFromTimestamp(parseInt(order.timestamp));
            break;
        case 'Name':
            returnData = order.user.forename + ' ' + order.user.surname;
            break;
        case 'PostCode':
            returnData = order.user.postcode;
            break;
        case 'Order Id':
            return (
                <TableCell
                    onClick={() => router.push(`/orders/${order.orderId}`)}
                >
                    {order.orderId}
                </TableCell>
            );
        case 'Change Status':
            return (
                <TableCell
                    onClick={(): void => {
                        changeOrderStatus(order.orderId, order.status);
                        fetchOrdersData();
                    }}
                >
                    {findCorrectBtn(order.status)}
                </TableCell>
            );
        case 'Status':
            returnData = capitaliseFirstChar(order.status);
            break;
        case 'Total Price':
            returnData = '£' + formatPrice(order.totalPayment / 100);
            break;
        default:
            returnData = null;
    }
    if (returnData) return <TableCell>{returnData}</TableCell>;
    return <TableCell>{null}</TableCell>;
}
