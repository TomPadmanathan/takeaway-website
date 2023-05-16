import Image from 'next/image';
import formatPrice from '@/utils/formatPrice';
import { useState } from 'react';
import AddCartModel from './AddCartModel';
import capitaliseFirstCharWords from '@/utils/capitaliseFirstCharWords';

export default function ProductTab(props: any) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="w-72 outline text-center pb-2">
                <Image
                    src={props.data.image}
                    className="border-black border w-72 aspect-[4/3]"
                    alt={props.data.product + ' image'}
                />
                <h2 className="text-xl">
                    {capitaliseFirstCharWords(props.data.product)}
                </h2>
                <span>£{formatPrice(props.data.price)}</span>
                <center>
                    <button
                        onClick={() => setOpen(true)}
                        className="border-black border w-24 h-10"
                    >
                        Add to Cart
                    </button>
                </center>
            </div>

            <AddCartModel data={props.data} open={[open, setOpen]} />
        </>
    );
}
