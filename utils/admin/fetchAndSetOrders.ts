import fetchWithToken from '@/utils/JWT/fetchWithToken';
import Order from '@/database/models/Order';

export default async function fetchAndSetOrders(
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
    interface orderResJson {
        error?: string;
        orders?: Order[];
    }
    const ordersResJson: orderResJson = await ordersRes.json();
    if (ordersResJson.error) {
        console.error(ordersResJson.error);
        return;
    }
    if (!ordersResJson.orders) {
        console.error('orders not defined');
        return;
    }
    setOrdersData(ordersResJson.orders);
    return;
}
