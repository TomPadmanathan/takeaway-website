// React/Next
import { useRouter } from 'next/navigation';

// Database Models
import Order from '@/database/models/Order';

// Utils
import formatPrice from '@/utils/formatPrice';
import capitaliseFirstChar from '@/utils/capitaliseFirstChar';
import getDateFromTimestamp from '@/utils/getDateFromTimestamp';
import getTimeFromTimestamp from '@/utils/getTimeFromTimestamp';
import findCorrectBtn from '@/utils/admin/findCorrectButton';
import fetchWithToken from '@/utils/JWT/fetchWithToken';

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

export default function TableData({
    order,
    heading,
    orders,
    today,
}: props): JSX.Element | null {
    const router: AppRouterInstance = useRouter();
    let returnData: string | JSX.Element | null;

    const [ordersData, setOrdersData] = orders;

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
                        changeOrderStatus(
                            order.orderId,
                            order.status,
                            setOrdersData,
                            today
                        );
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

async function changeOrderStatus(
    orderId: string,
    currentStatus: string,
    setOrdersData: React.Dispatch<React.SetStateAction<Order[]>>,
    today: boolean
): Promise<void> {
    const status: string[] = ['pending', 'accepted', 'dispatched', 'delivered'];

    let newStatus;
    status.forEach((value: string, index: number): void => {
        if (value === currentStatus) newStatus = status[index + 1];
    });
    if (!newStatus) {
        console.error('New status is undefined');
        return;
    }
    const response: Response = await fetchWithToken('/api/changeOrderStatus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            orderId: orderId,
            status: newStatus,
        }),
    });
    const responseJson = await response.json();
    if (responseJson.error) {
        console.error(responseJson.error);
        return;
    }
    fetchAndSetOrders(setOrdersData, today);
}
async function fetchAndSetOrders(
    setOrdersData: React.Dispatch<React.SetStateAction<Order[]>>,
    today: boolean
): Promise<void> {
    let ordersRes: Response;
    if (!today)
        ordersRes = await fetchWithToken(
            process.env.NEXT_PUBLIC_URL + '/api/orders',
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }
        );
    else {
        ordersRes = await fetchWithToken(
            process.env.NEXT_PUBLIC_URL + '/api/ordersFromToday',
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
    interface ordersResJson {
        error?: string;
        orders?: Order[];
    }
    const ordersResJson: ordersResJson = await ordersRes.json();
    if (ordersResJson.error) {
        console.error(ordersResJson.error);
        return;
    }
    if (!ordersResJson.orders) {
        console.error('orders not defined');
        return;
    }
    console.log('test');
    setOrdersData(ordersResJson.orders);
}
