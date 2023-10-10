import Image from 'next/image';
import Black from '@/assets/img/black.png';
import formatPrice from '@/utils/formatPrice';
import Cart from '@/components/Cart';
import { useContext, useState } from 'react';
import { AppContext } from '@/context/AppContext';
import { NextRouter, useRouter } from 'next/router';
import CalculateCheckoutPrices from '@/utils/CalculateCheckoutPrices';
import { config } from '@/interfaces/config';

interface props {
    search: [string, React.Dispatch<React.SetStateAction<string>>];
    configData: config;
}

export default function Navbar(props: props) {
    const { cart } = useContext(AppContext);
    const [cartOpen, setCartOpen] = useState<boolean>(false);
    const [search, setSearch] = props.search;
    const router: NextRouter = useRouter();
    const checkoutPrices = new CalculateCheckoutPrices(cart, props.configData);

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
                    <button className="h-10 w-10 overflow-hidden border border-black">
                        Profile
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
