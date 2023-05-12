import Image from 'next/image';
import formatPrice from '@/utils/formatPrice';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import addItemCart from '@/utils/addItemCart';

export default function ProductTab(props: any) {
    const { cart, setCart } = useContext(AppContext);

    return (
        <>
            <div className="w-72 outline text-center pb-2">
                <Image
                    src={props.data.image}
                    className="border-black border w-72 aspect-[4/3]"
                    alt={props.data.product + ' image'}
                />
                <h2 className="text-xl">{props.data.product}</h2>
                <span>£{formatPrice(props.data.price)}</span>
                <center>
                    <button
                        onClick={() => addItemCart(props.data, cart, setCart)}
                        className="border-black border w-24 h-10 overflow-hidden block"
                    >
                        Add to Cart
                    </button>
                </center>
            </div>
        </>
    );
}
