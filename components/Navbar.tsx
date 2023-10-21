// React/Next
import Image from 'next/image';
import { NextRouter, useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

// Packages
import jwt from 'jsonwebtoken';

// Context
import { AppContext } from '@/context/AppContext';

// Utils
import formatPrice from '@/utils/formatPrice';
import CalculateCheckoutPrices from '@/utils/CalculateCheckoutPrices';

// Components
import Cart from '@/components/Cart';

// Types/Interfaces
import { config } from '@/interfaces/config';

// Assets
import Black from '@/assets/img/black.png';

interface props {
    search: [string, React.Dispatch<React.SetStateAction<string>>];
    configData: config;
}

export default function Navbar(props: props): JSX.Element {
    const { cart } = useContext(AppContext);
    const [cartOpen, setCartOpen] = useState<boolean>(false);
    const [search, setSearch] = props.search;
    const router: NextRouter = useRouter();
    const checkoutPrices = new CalculateCheckoutPrices(cart, props.configData);
    const [token, setToken] = useState<string | null>(null);
    let userId: string;
    useEffect((): void => {
        setToken(localStorage.getItem('token'));
        if (!token) return;
        const decodedToken: jwt.JwtPayload | null | string = jwt.decode(token);
        if (!decodedToken || typeof decodedToken != 'object') return;
        userId = decodedToken.userId;
    });

    return (
        <>
            <nav className="mx-96 my-16 flex justify-between">
                <Image
                    src={Black}
                    className="h-20 w-40 border border-black hover:cursor-pointer"
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
                        className="h-10 w-96 border border-black"
                        value={search}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ): void => setSearch(event.target.value)}
                    ></input>
                </div>

                <div className="flex">
                    <button
                        className="h-10 w-32 overflow-hidden border border-black"
                        onClick={
                            token
                                ? (): Promise<boolean> =>
                                      router.push(`/user/${userId}`)
                                : (): Promise<boolean> =>
                                      router.push('/auth/login')
                        }
                    >
                        {token ? 'Go to account' : 'Login'}
                    </button>
                    <button
                        onClick={(): void => setCartOpen(!cartOpen)}
                        className="h-10 w-10 overflow-hidden border border-black"
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
