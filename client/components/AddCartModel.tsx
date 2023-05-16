import addItemCart from '@/utils/addItemCart';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import capitaliseFirstChar from '@/utils/capitaliseFirstChar';

export default function ProductTab(props: any) {
    const { cart, setCart } = useContext(AppContext);
    const [open, setOpen] = props.open;
    const [selectedOption, setSelectedOption] = useState<any>(null);

    useEffect(() => {
        if (!props.data.options) {
            return;
        }
        const initialSelectedOption = props.data.options.map(
            (subArray: any) => subArray[0]
        );
        setSelectedOption(initialSelectedOption);
    }, [props.data.options]);

    const handleAddItemCart = () => {
        const newItem = { ...props.data, options: selectedOption };
        addItemCart(newItem, setCart);
        setOpen(false);
        if (props.data.options) {
            const resetSelectedOption = props.data.options.map(
                (subArray: any) => subArray[0]
            );
            setSelectedOption(resetSelectedOption);
        }
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
                    <div className="flex flex-col items-center">
                        <h2 className="mb-20 text-2xl">{props.data.product}</h2>
                        <div className="flex-row">
                            {props.data.options &&
                                props.data.options.map(
                                    (subArray: any, i: number) => (
                                        <select
                                            key={subArray}
                                            onChange={(e: any) => {
                                                const updatedOptions =
                                                    selectedOption
                                                        ? [...selectedOption]
                                                        : [];
                                                updatedOptions[i] =
                                                    e.target.value;
                                                setSelectedOption(
                                                    updatedOptions
                                                );
                                            }}
                                            value={
                                                selectedOption
                                                    ? selectedOption[i]
                                                    : ''
                                            }
                                            className="mb-20 mx-2"
                                        >
                                            {subArray.map((e: any) => (
                                                <option key={e}>
                                                    {capitaliseFirstChar(e)}
                                                </option>
                                            ))}
                                        </select>
                                    )
                                )}
                        </div>

                        <button
                            onClick={handleAddItemCart}
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
