// React/Next
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { NextRouter, useRouter } from 'next/router';

// Packages
import { Appearance, loadStripe, Stripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Context
import { AppContext } from '@/context/AppContext';

// Utils
import fetchWithToken from '@/utils/JWT/fetchWithToken';

// Components
import CheckoutForm from '@/components/CheckoutForm';
import BottomNav from '@/components/page/nav/BottomNav';
import Footer from '@/components/page/Footer';

let stripePromise: Promise<Stripe | null>;

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
    console.error('Stripe public key not defined');
else stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function App(): JSX.Element {
    const [clientSecret, setClientSecret] = useState<string>('');
    const { cart } = useContext(AppContext);
    const router: NextRouter = useRouter();

    const fetchData = useCallback(async (): Promise<void> => {
        const response: Response = await fetchWithToken(
            '/api/create-payment-intent',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cart: cart,
                    checkoutData: JSON.stringify(router.query),
                }),
            }
        );
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
        <>
            <BottomNav />
            <div className="flex h-[85vh] items-center justify-center">
                <section className="my-5 h-[720px] w-[480px] rounded bg-white p-5 shadow-lg xs:h-full xs:w-full xs:shadow-none">
                    {clientSecret && (
                        <Elements options={options} stripe={stripePromise}>
                            <CheckoutForm />
                        </Elements>
                    )}
                </section>
            </div>
            <Footer />
        </>
    );
}
