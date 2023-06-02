import Image from 'next/image';
import formatPrice from '@/utils/formatPrice';
import { useState } from 'react';
import AddCartModel from './AddCartModel';
import capitaliseFirstCharWords from '@/utils/capitaliseFirstCharWords';

export default function ProductTab(props: any) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="w-72 pb-2 text-center outline">
                <Image
                    src={props.data.image}
                    className="aspect-[4/3] w-72 border border-black"
                    alt={props.data.product + ' image'}
                />
                <h2 className="text-xl">
                    {capitaliseFirstCharWords(props.data.product)}
                </h2>
                <span>£{formatPrice(props.data.price)}</span>
                <center>
                    <button
                        onClick={() => setOpen(true)}
                        className="h-10 w-24 border border-black"
                    >
                        Add to Cart
                    </button>
                </center>
            </div>

            <AddCartModel data={props.data} open={[open, setOpen]} />
        </>
    );
}
