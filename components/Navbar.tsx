import Image from 'next/image';
import Black from '@/assets/img/black.png';
import formatPrice from '@/utils/formatPrice';
import Cart from '@/components/Cart';
import { useContext, useState } from 'react';
import { AppContext } from '@/context/AppContext';

export default function Navbar(props: any) {
    const { cart, setCart } = useContext(AppContext);
    const [buttonStatus, setButtonStatus] = useState(false);
    const [search, setSearch] = props.search;

    return (
        <>
            <nav className="mx-80 my-16 flex justify-between">
                <Image
                    src={Black}
                    className="h-20 w-96 border border-black"
                    alt={'site-icon'}
                />

                <div className="flex">
                    <input
                        placeholder="Search"
                        type="text"
                        className="h-10 w-96 border border-black"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    ></input>
                    <button className="h-10 w-10 overflow-hidden border border-black">
                        Submit
                    </button>
                </div>

                <div className="flex">
                    <button className="h-10 w-10 overflow-hidden border border-black">
                        Profile
                    </button>
                    <button
                        onClick={() => setButtonStatus(!buttonStatus)}
                        className="h-10 w-10 overflow-hidden border border-black"
                    >
                        Cart
                    </button>
                    <span>
                        {cart.length} {cart.length == 1 ? 'item' : 'items'} - £
                        {formatPrice(
                            cart.reduce(
                                (acc: any, item: any) => acc + item.price,
                                0
                            )
                        )}
                    </span>
                </div>
            </nav>

            <Cart isVisible={buttonStatus} configData={props.configData} />
        </>
    );
}
