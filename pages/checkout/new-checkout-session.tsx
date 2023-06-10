import React, { useEffect, useState, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@/components/CheckoutForm';
import { AppContext } from '@/context/AppContext';

const stripePromise: any = loadStripe(
    'pk_test_51NHEXnCgtXcc2Q70RVpnW27B2K9q2NSYP5VA9m7AMjaDpWtpXsVyH8ApqUe3dcoU7iln44Xih7zJgVdOMpTNNv6I00Z3xlQnlO'
);

export default function App() {
    const [clientSecret, setClientSecret] = useState('');
    const { cart, setCart } = useContext(AppContext);

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cart: cart }),
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret));
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options: any = {
        clientSecret,
        appearance,
    };

    return (
        <div className="App">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    );
}
