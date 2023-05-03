import Image from 'next/image';
import formatPrice from '@/utils/formatPrice';

export default function ProductTab(props: any) {
    return (
        <>
            <div className="w-72 outline text-center">
                <Image
                    src={props.image}
                    className="border-black border w-72 aspect-[4/3]"
                    alt={'Food Image'}
                />
                <h2 className="text-xl">{props.name}</h2>
                <span>£{formatPrice(props.price)}</span>
                <center>
                    <button className="border-black border w-24 h-10 overflow-hidden block">
                        Add to Cart
                    </button>
                </center>
            </div>
        </>
    );
}
