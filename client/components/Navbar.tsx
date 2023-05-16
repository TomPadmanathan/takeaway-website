import { useState } from 'react';
import Image from 'next/image';
import Black from '@/assets/img/black.png';
import formatPrice from '@/utils/formatPrice';
import Cart from '@/components/Cart';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function Navbar(props: any) {
    const { cart, setCart } = useContext(AppContext);
    const [buttonStatus, setButtonStatus] = useState(false);
    const [search, setSearch] = props.search;
    const handleCartClick = () => {
        setButtonStatus(!buttonStatus);
    };

    function searchChange(e: any) {
        setSearch(e.target.value);
    }

    return (
        <>
            <div className="flex mx-80 my-16 justify-between">
                <Image
                    src={Black}
                    className="border-black border w-96 h-20"
                    alt={'site-icon'}
                />

                <div className="flex">
                    <input
                        placeholder="Search"
                        type="text"
                        className="border-black border w-96 h-10"
                        value={search}
                        onChange={e => searchChange(e)}
                    ></input>
                    <button className="border-black border w-10 h-10 overflow-hidden">
                        Submit
                    </button>
                </div>

                <div className="flex">
                    <button className="border-black border w-10 h-10 overflow-hidden">
                        Profile
                    </button>
                    <button
                        onClick={handleCartClick}
                        className="border-black border w-10 h-10 overflow-hidden"
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
            </div>

            <Cart isVisible={buttonStatus} />
        </>
    );
}
