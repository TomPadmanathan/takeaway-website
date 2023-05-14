import addItemCart from '@/utils/addItemCart';
import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

export default function ProductTab(props: any) {
    const { cart, setCart } = useContext(AppContext);
    const [open, setOpen] = props.open;
    const [selectedOption, setSelectedOption] = useState('Rice');

    const handleAddItemCart = () => {
        const newItem = { ...props.data, options: selectedOption };
        addItemCart(newItem, setCart);
        setOpen(false);
    };

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
                    <select
                        value={selectedOption}
                        onChange={e => setSelectedOption(e.target.value)}
                    >
                        <option value="Rice">Rice</option>
                        <option value="Noodle">Noodle</option>
                    </select>
                    <button
                        onClick={handleAddItemCart}
                        className="border-black border w-24 h-10"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </>
    );
}
