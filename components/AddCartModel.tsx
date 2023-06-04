import addItemCart from '@/utils/addItemCart';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/context/AppContext';
import capitaliseFirstChar from '@/utils/capitaliseFirstChar';
import capitaliseFirstCharWords from '@/utils/capitaliseFirstCharWords';
import QuantityCounter from '@/components/QuantityCounter';
import SecondaryButton from './SecondaryButton';

export default function ProductTab(props: any) {
    const { cart, setCart } = useContext(AppContext);
    const [open, setOpen] = props.open;
    const [selectedOption, setSelectedOption] = useState<any>(null);
    const [quantity, setQuantity] = useState<any>(1);

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
        const newItem = [];

        for (let i = quantity; i != 0; i--) {
            newItem.push({
                ...props.data,
                options: selectedOption,
            });
        }
        addItemCart(newItem, setCart);
        setOpen(false);
        if (props.data.options) {
            const resetSelectedOption = props.data.options.map(
                (subArray: any) => subArray[0]
            );
            setSelectedOption(resetSelectedOption);
        }
        if (quantity != 1) {
            setQuantity(1);
        }
    };

    return (
        <>
            <div
                className={`absolute inset-0 flex items-center justify-center ${
                    open ? 'opacity-1' : 'pointer-events-none opacity-0'
                }`}
            >
                <div className="relative flex h-96 w-[40rem] items-center justify-center border-2 border-black bg-slate-200">
                    <button
                        onClick={() => setOpen(false)}
                        className="absolute right-0 top-0"
                    >
                        Close
                    </button>
                    <div className="flex flex-col items-center">
                        <h2 className="mb-20 text-2xl">
                            {capitaliseFirstCharWords(props.data.product)}
                        </h2>
                        <div className="mb-20 flex-row">
                            <QuantityCounter
                                quantity={[quantity, setQuantity]}
                            />
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
                                            className="mx-2"
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

                        <SecondaryButton
                            onClick={handleAddItemCart}
                            content="Add to Cart"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
