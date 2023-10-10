import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Appearance, loadStripe, Stripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@/components/CheckoutForm';
import { AppContext } from '@/context/AppContext';
import { NextRouter, useRouter } from 'next/router';

const stripePromise: Promise<Stripe | null> = loadStripe(
    'pk_test_51NHEXnCgtXcc2Q70RVpnW27B2K9q2NSYP5VA9m7AMjaDpWtpXsVyH8ApqUe3dcoU7iln44Xih7zJgVdOMpTNNv6I00Z3xlQnlO'
);

export default function App() {
    const [clientSecret, setClientSecret] = useState<string>('');
    const { cart } = useContext(AppContext);
    const router: NextRouter = useRouter();

    // async function fetchData() {
    //     const response: Response = await fetch('/api/create-payment-intent', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //             cart: cart,
    //             userData: JSON.stringify(router.query),
    //         }),
    //     });
    //     const data = await response.json();
    //     setClientSecret(data.clientSecret);
    // }

    const fetchData = useCallback(async () => {
        const response: Response = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                cart: cart,
                userData: JSON.stringify(router.query),
            }),
        });
        const data = await response.json();
        setClientSecret(data.clientSecret);
    }, [cart, router.query]);

    useEffect((): void => {
        if (cart.length > 0 && router.isReady) fetchData();
    }, [cart, router.isReady, fetchData]);

    interface options {
        clientSecret: string;
        appearance: Appearance;
    }

    const appearance: Appearance = {
        theme: 'stripe',
    };
    const options: options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="flex h-screen items-center justify-center">
            <section className="h-[45rem] w-[30rem] border-2 border-black p-10">
                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                )}
            </section>
        </div>
    );
}
