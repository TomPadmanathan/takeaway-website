import Image from 'next/image';
import formatPrice from '@/utils/formatPrice';
import { useState } from 'react';
import AddCartModel from '@/components/AddCartModel';
import capitaliseFirstCharWords from '@/utils/capitaliseFirstCharWords';
import SecondaryButton from '@/components/SecondaryButton';
import { product } from '@/interfaces/products';

interface props {
    product: product;
}

export default function ProductTab(props: props): JSX.Element {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <div className="w-72 pb-2 text-center outline">
                <Image
                    src={props.product.image}
                    className="aspect-[4/3] w-72 border border-black"
                    alt={props.product.product + ' image'}
                />
                <h2 className="text-xl">
                    {capitaliseFirstCharWords(props.product.product)}
                </h2>
                <span>£{formatPrice(props.product.price)}</span>
                <center>
                    <SecondaryButton
                        onClick={() => setOpen(true)}
                        content="Add to Cart"
                    />
                </center>
            </div>

            <AddCartModel product={props.product} open={[open, setOpen]} />
        </>
    );
}
