// Utils
import fetchWithToken from '../JWT/fetchWithToken';

export default async function changeOrderStatus(
    orderId: string,
    currentStatus: string
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
}
