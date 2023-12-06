// Utils
import fetchWithToken from '@/utils/JWT/fetchWithToken';
import fetchAndSetOrders from '@/utils/admin/fetchAndSetOrders';

// Database Models
import Order from '@/database/models/Order';

export default async function changeOrderStatus(
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
