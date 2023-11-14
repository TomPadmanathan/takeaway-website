// React/Next
import React, { useContext, useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { NextRouter, useRouter } from 'next/router';

// Components
import Products from '@/components/Products';
import Cart from '@/components/Cart';

// Types/Interfaces
import { products } from '@/interfaces/products';
import { config } from '@/interfaces/config';

// Packages
import jwt from 'jsonwebtoken';

// Context
import { AppContext } from '@/context/AppContext';

// Utils
import formatPrice from '@/utils/formatPrice';
import CalculateCheckoutPrices from '@/utils/CalculateCheckoutPrices';

// Assets
import Black from '@/assets/img/black.png';

interface props {
    productsData: products;
    configData: config;
}

interface getServerSideProps {
    props: props;
}

export async function getServerSideProps(): Promise<getServerSideProps> {
    const productsRes: Response = await fetch(
        process.env.NEXT_PUBLIC_URL + '/api/products'
    );
    const productsData: products = await productsRes.json();

    const configRes: Response = await fetch(
        process.env.NEXT_PUBLIC_URL + '/api/config'
    );
    const configData: config = await configRes.json();
    return {
        props: {
            productsData,
            configData,
        },
    };
}

export default function Home({ productsData, configData }: props): JSX.Element {
    const [search, setSearch] = useState<string>('');
    const [cartOpen, setCartOpen] = useState<boolean>(false);

    return (
        <>
            <Navbar
                search={[search, setSearch]}
                configData={configData}
                cartOpen={[cartOpen, setCartOpen]}
            />
            <main>
                <Products search={search} products={productsData} />
            </main>
        </>
    );
}

interface navProps {
    search: [string, React.Dispatch<React.SetStateAction<string>>];
    cartOpen: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    configData: config;
}

function Navbar(props: navProps): JSX.Element {
    const { cart } = useContext(AppContext);
    const [cartOpen, setCartOpen] = props.cartOpen;
    const [search, setSearch] = props.search;
    const router: NextRouter = useRouter();
    const checkoutPrices = new CalculateCheckoutPrices(cart, props.configData);
    const [token, setToken] = useState<string | null>(null);
    const userId = useRef<string>();

    useEffect((): void => {
        setToken(localStorage.getItem('token'));
        if (!token) return;
        const decodedToken: jwt.JwtPayload | null | string = jwt.decode(token);
        if (!decodedToken || typeof decodedToken != 'object') return;
        userId.current = decodedToken.userId;
    }, [token]);

    return (
        <>
            <nav className="mx-96 my-16 flex justify-between">
                <Image
                    src={Black}
                    className="border-black h-20 w-40 border hover:cursor-pointer"
                    alt={'site-icon'}
                    onClick={(): void => {
                        router.push('/');
                        setSearch('');
                        setCartOpen(false);
                    }}
                />

                <div className="flex">
                    <input
                        placeholder="Search"
                        type="text"
                        className="border-black h-10 w-96 border"
                        value={search}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ): void => setSearch(event.target.value)}
                    ></input>
                </div>

                <div className="flex">
                    <button
                        className="border-black h-10 w-32 overflow-hidden border"
                        onClick={
                            token
                                ? (): Promise<boolean> =>
                                      router.push(`/users/${userId.current}`)
                                : (): Promise<boolean> =>
                                      router.push('/auth/login')
                        }
                    >
                        {token ? 'Go to account' : 'Login'}
                    </button>
                    <button
                        onClick={(): void => setCartOpen(!cartOpen)}
                        className="border-black h-10 w-10 overflow-hidden border"
                    >
                        Cart
                    </button>
                    <span>
                        {cart.length} {cart.length == 1 ? 'item' : 'items'} - £
                        {formatPrice(checkoutPrices.subTotal)}
                    </span>
                </div>
            </nav>

            <Cart isVisible={cartOpen} configData={props.configData} />
        </>
    );
}
