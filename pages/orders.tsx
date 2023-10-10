import { orders } from '@/interfaces/orders';
import { NextRouter, useRouter } from 'next/router';

async function fetchOrderFromPaymentIntent(router: NextRouter): Promise<void> {
    if (!router.query.payment_intent) return;
    const paymentIntent: string | string[] = router.query.payment_intent;

    const response: Response = await fetch(
        'http://localhost:3000/api/getOrderFromPaymentIntent',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                paymentIntent: JSON.stringify(paymentIntent),
            }),
        }
    );
    const data: orders = await response.json();
    router.push({
        pathname: `orders/${data[0].OrderId}`,
    });
}

export default function Orders() {
    const router: NextRouter = useRouter();
    fetchOrderFromPaymentIntent(router);
}
