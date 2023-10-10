import { NextRouter, useRouter } from 'next/router';

async function fetchOrderFromPaymentIntent(router: NextRouter): Promise<void> {
    const paymentIntent = router.query.payment_intent;

    const response = await fetch(
        'http://localhost:3000/api/getOrderFromPaymentIntent',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                paymentIntent: JSON.stringify(paymentIntent),
            }),
        }
    );
    const data = await response.json();
    router.push({
        pathname: `orders/${data[0].OrderId}`,
    });
}

export default function Orders() {
    const router = useRouter();
    fetchOrderFromPaymentIntent(router);
}
