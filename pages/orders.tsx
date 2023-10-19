// Packages
import { NextRouter, useRouter } from 'next/router';

// Database Models
import Order from '@/database/models/Order';

async function fetchOrderFromPaymentIntent(router: NextRouter): Promise<void> {
    if (!router.query.payment_intent) return;
    const paymentIntent: string | string[] = router.query.payment_intent;

    const response: Response = await fetch(
        process.env.NEXT_PUBLIC_URL + '/api/getOrderFromPaymentIntent',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                paymentIntent: paymentIntent,
            }),
        }
    );
    const data: Order = await response.json();

    router.push({
        pathname: `orders/${data.orderId}`,
    });
}

export default function Orders(): void {
    const router: NextRouter = useRouter();
    fetchOrderFromPaymentIntent(router);
}
