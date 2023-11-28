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
import { config } from '@/interfaces/config';
import User from '@/database/models/User';

interface props {
    configData: config;
}
interface getServerSideProps {
    props: props;
}

export async function getServerSideProps(): Promise<getServerSideProps> {
    const configRes: Response = await fetch(
        process.env.NEXT_PUBLIC_URL + '/api/config'
    );
    const configData: config = await configRes.json();
    return {
        props: {
            configData,
        },
    };
}

export default function Home({ configData }: props): JSX.Element {
    const router: NextRouter = useRouter();
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
        <>
            <BottomNav />
            <div className="relative mx-96 my-10 flex h-[85vh] items-center justify-between">
                <ListItemsWithPrice cart={cart} config={configData} />
                <section className="h-[720px] w-[480px] rounded bg-white p-5 shadow-lg">
                    {user ? <CheckoutUser user={user} /> : <CheckoutGuest />}
                </section>
            </div>

            <button
                onClick={(): Promise<boolean> => router.push('/')}
                className="absolute right-10 top-32 h-16 rounded-sm bg-white px-3 text-grey transition-all hover:bg-lightgrey hover:text-white"
            >
                Go Back
            </button>
            <Footer />
        </>
    );
}
