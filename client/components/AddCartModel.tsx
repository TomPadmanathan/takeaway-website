import addItemCart from '@/utils/addItemCart';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function ProductTab(props: any) {
    const { cart, setCart } = useContext(AppContext);
    const [open, setOpen] = props.open;

    return (
        <>
            <div
                className={`absolute inset-0 flex items-center justify-center ${
                    open ? 'opacity-1' : 'opacity-0 pointer-events-none'
                }`}
            >
                <div className="border-2 border-black flex justify-center items-center w-[40rem] h-96 bg-slate-200 relative">
                    <button
                        onClick={() => setOpen(false)}
                        className="absolute right-0 top-0"
                    >
                        Close
                    </button>
                    <h1>{props.data.product}</h1>
                    <div className="mt-2">
                        <button
                            onClick={() => addItemCart(props.data, setCart)}
                            className="border-black border w-24 h-10"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
