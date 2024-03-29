// React/Next
import React, { useState, useEffect, FormEvent } from 'react';

// Packages
import {
    PaymentElement,
    LinkAuthenticationElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

// Types/Interfaces
import {
    StripeElements,
    Stripe,
    PaymentIntentResult,
    StripePaymentElementOptions,
    StripeLinkAuthenticationElementChangeEvent,
} from '@stripe/stripe-js';

export default function CheckoutForm(): JSX.Element {
    const stripe: Stripe | null = useStripe();
    const elements: StripeElements | null = useElements();

    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string | undefined>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect((): void => {
        if (!stripe) return;

        const clientSecret = new URLSearchParams(window.location.search).get(
            'payment_intent_client_secret'
        );

        if (!clientSecret) return;

        stripe
            .retrievePaymentIntent(clientSecret)
            .then(({ paymentIntent }: PaymentIntentResult) => {
                if (!paymentIntent?.status) {
                    console.error('Payment intent status is undefined');
                    return;
                }

                switch (paymentIntent.status) {
                    case 'succeeded':
                        setMessage('Payment succeeded!');
                        break;
                    case 'processing':
                        setMessage('Your payment is processing.');
                        break;
                    case 'requires_payment_method':
                        setMessage(
                            'Your payment was not successful, please try again.'
                        );
                        break;
                    default:
                        setMessage('Something went wrong.');
                        break;
                }
            });
    }, [stripe]);

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault();

        if (!stripe || !elements) return;

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: process.env.NEXT_PUBLIC_URL + '/orders',
            },
        });

        // This only reached if imediate
        if (error.type === 'card_error' || error.type === 'validation_error')
            setMessage(error.message);
        else setMessage('An unexpected error occurred.');

        setIsLoading(false);
    }

    const paymentElementOptions: StripePaymentElementOptions = {
        layout: 'tabs',
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <LinkAuthenticationElement
                id="link-authentication-element"
                onChange={(
                    value: StripeLinkAuthenticationElementChangeEvent
                ) => {
                    if (typeof value === 'string') setEmail(value);
                }}
            />
            <PaymentElement
                id="payment-element"
                options={paymentElementOptions}
            />
            <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isLoading ? (
                        <div className="spinner" id="spinner"></div>
                    ) : (
                        'Pay now'
                    )}
                </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}
