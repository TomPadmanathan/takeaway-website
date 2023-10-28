// React/Next
import { useContext, useState, useEffect } from 'react';
import { NextRouter, useRouter } from 'next/router';

// Packages
import Jwt, { JwtPayload } from 'jsonwebtoken';

// Context
import { AppContext } from '@/context/AppContext';

// Components
import SecondaryButton from '@/components/SecondaryButton';
import ListItemsWithPrice from '@/components/ListItemsWithPrice';
import CheckoutGuest from '@/components/checkout/CheckoutGuest';
import CheckoutUser from '@/components/checkout/CheckoutUser';

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
            <div className="mx-96 my-10 flex h-screen items-center justify-between">
                <ListItemsWithPrice cart={cart} config={configData} />
                <section className="h-[45rem] w-[30rem] border-2 border-black p-10">
                    {user ? <CheckoutUser user={user} /> : <CheckoutGuest />}
                </section>
            </div>

            <SecondaryButton
                onClick={(): Promise<boolean> => router.push('/')}
                content="Back"
                addClass="absolute right-10 top-10"
            />
        </>
    );
}
