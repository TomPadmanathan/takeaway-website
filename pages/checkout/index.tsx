// React/Next
import { useContext, useState, useEffect } from 'react';
import { NextRouter, useRouter } from 'next/router';

// Context
import { AppContext } from '@/context/AppContext';

// Components
import ListItemsWithPrice from '@/components/ListItemsWithPrice';
import CheckoutGuest from '@/components/checkout/CheckoutGuest';
import CheckoutUser from '@/components/checkout/CheckoutUser';
import BottomNav from '@/components/page/nav/BottomNav';
import Footer from '@/components/page/Footer';

// Utils
import fetchWithToken from '@/utils/JWT/fetchWithToken';

// Types/Interfaces
import User from '@/database/models/User';

export default function Home(): JSX.Element {
    const { cart } = useContext(AppContext);
    const [user, setUser] = useState<null | User>();

    useEffect((): void => {
        async function fetchData(): Promise<void> {
            const response: Response = await fetchWithToken(
                process.env.NEXT_PUBLIC_URL + '/api/getUserFromToken',
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            const responseJson = await response.json();
            if (responseJson.error) {
                console.error(responseJson.error);
                return;
            }
            setUser(responseJson.user);
        }
        fetchData();
    }, []);

    return (
        <div className="xs:bg-white">
            <BottomNav />
            <div className="relative my-10 flex items-center justify-around m:block">
                <ListItemsWithPrice cart={cart} />
                <div className="hidden h-5 bg-lightergrey xs:block" />
                <section className="my-5 h-[720px] w-[480px] rounded bg-white p-5 shadow-lg xs:w-full xs:shadow-none">
                    {user ? <CheckoutUser user={user} /> : <CheckoutGuest />}
                </section>
            </div>
            <Footer />
        </div>
    );
}
