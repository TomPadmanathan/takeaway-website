import React, { useEffect, useState, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@/components/CheckoutForm';
import { AppContext } from '@/context/AppContext';
import removeArrowsFromInput from '@/utils/removeArrowsFromInput';
import PrimaryInput from '@/components/PrimaryInput';

const stripePromise: any = loadStripe(
    'pk_test_51NHEXnCgtXcc2Q70RVpnW27B2K9q2NSYP5VA9m7AMjaDpWtpXsVyH8ApqUe3dcoU7iln44Xih7zJgVdOMpTNNv6I00Z3xlQnlO'
);

export default function App() {
    const [clientSecret, setClientSecret] = useState('');
    const { cart, setCart } = useContext(AppContext);
    const [userData, setUserData] = useState<any>({ includeCutlery: false });

    async function fetchData() {
        const response = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cart: cart, userData: userData }),
        });
        const data = await response.json();
        setClientSecret(data.clientSecret);
    }

    useEffect(() => {
        if (cart.length > 0 && !clientSecret) fetchData();
    }, [cart, clientSecret]);

    const appearance = {
        theme: 'stripe',
    };
    const options: any = {
        clientSecret,
        appearance,
    };

    useEffect(() => {
        console.log(userData);
    }, [userData]);

    return (
        <div className="mx-96 my-10 flex h-screen items-center justify-between">
            <section className="h-[45rem] w-[30rem] border-2 border-black p-10">
                <label htmlFor="phone-number">Your Info</label>
                <div className="mb-10 flex justify-between">
                    <PrimaryInput
                        type="number"
                        placeholder="Phone Number"
                        id="phone-number"
                        required={true}
                        inputMode="numeric"
                        onKeyPress={(e: any) => {
                            if (!/[0-9]/.test(e.key)) e.preventDefault();
                        }}
                        onChange={(e: any) => {
                            const newUserData = { ...userData };
                            newUserData.phoneNumber = parseInt(e.target.value);
                            setUserData(newUserData);
                        }}
                        addClass={removeArrowsFromInput}
                    />
                    <PrimaryInput
                        type="email"
                        placeholder="Email"
                        onChange={(e: any) => {
                            const newUserData = { ...userData };
                            newUserData.email = e.target.value;
                            setUserData(newUserData);
                        }}
                    />
                </div>
                <label htmlFor="address-line-1">Address</label>
                <div className="mb-2 flex justify-between">
                    <PrimaryInput
                        placeholder="Address line 1"
                        id="address-line-1"
                        required={true}
                        onChange={(e: any) => {
                            const newUserData = { ...userData };
                            newUserData.addressLine1 = e.target.value;
                            setUserData(newUserData);
                        }}
                    />
                    <PrimaryInput
                        placeholder="Address line 2 (optional)"
                        onChange={(e: any) => {
                            const newUserData = { ...userData };
                            newUserData.addressLine2 = e.target.value;
                            setUserData(newUserData);
                        }}
                    />
                </div>
                <div className="mb-10 flex justify-between">
                    <PrimaryInput
                        placeholder="City/Town"
                        onChange={(e: any) => {
                            const newUserData = { ...userData };
                            newUserData.cityTown = e.target.value;
                            setUserData(newUserData);
                        }}
                    />
                    <PrimaryInput
                        placeholder="Postcode"
                        value={userData.postcode}
                        onChange={(e: any) => {
                            const newUserData = { ...userData };
                            newUserData.postcode = e.target.value.toUpperCase();
                            setUserData(newUserData);
                        }}
                    />
                </div>
                <label htmlFor="">Order Info</label>
                <div className="flex justify-between">
                    <textarea
                        placeholder="Leave us a note (optional)"
                        className="block h-10 resize-none border border-black"
                        onChange={(e: any) => {
                            const newUserData = { ...userData };
                            newUserData.orderNote = e.target.value;
                            setUserData(newUserData);
                        }}
                    />
                    <label htmlFor="include-cutlery">Include Cutlery</label>
                    <PrimaryInput
                        type="checkbox"
                        id="include-cutlery"
                        onChange={(e: any) => {
                            const newUserData = { ...userData };
                            newUserData.includeCutlery = e.target.checked;
                            setUserData(newUserData);
                        }}
                    />
                </div>
            </section>

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
