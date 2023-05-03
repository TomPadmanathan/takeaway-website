import { useState } from 'react';
import Image from 'next/image';
import Black from '../assets/img/black.png';
import formatPrice from '@/utils/formatPrice';
import Cart from '../components/Cart';

export default function Navbar() {
    const [itemsCount, setItemsCount] = useState(3);
    const [totalPrice, setTotalPrice] = useState(0);

    const [buttonStatus, setButtonStatus] = useState(true);
    const handleCartClick = () => {
        setButtonStatus(!buttonStatus);
    };

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
                        {itemsCount} {itemsCount == 1 ? 'item' : 'items'} - £
                        {formatPrice(totalPrice)}
                    </span>
                </div>
            </div>

            <Cart isVisible={buttonStatus} />
        </>
    );
}
