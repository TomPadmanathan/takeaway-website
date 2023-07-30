import addItemCart from '@/utils/addItemCart';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { AppContext } from '@/context/AppContext';
import capitaliseFirstChar from '@/utils/capitaliseFirstChar';
import capitaliseFirstCharWords from '@/utils/capitaliseFirstCharWords';
import QuantityCounter from '@/components/QuantityCounter';
import SecondaryButton from './SecondaryButton';
import { product } from '@/interfaces/products';

interface props {
    open: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    product: product;
}

export default function AddCartModel(props: props) {
    const { setCart } = useContext(AppContext);
    const [open, setOpen] = props.open;
    const [selectedOption, setSelectedOption] = useState<string[]>([]);
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        if (!props.product.options) return;
        const initialSelectedOption = props.product.options.map(
            (subArray: string[]) => subArray[0]
        );
        setSelectedOption(initialSelectedOption);
    }, [props.product.options]);

    function handleAddItemCart() {
        const newItem = [];

        for (let index = quantity; index != 0; index--) {
            newItem.push({
                ...props.product,
                options: selectedOption,
            });
        }
        addItemCart(newItem, setCart);
        setOpen(false);
        if (props.product.options) {
            const resetSelectedOption = props.product.options.map(
                (subArray: string[]) => subArray[0]
            );
            setSelectedOption(resetSelectedOption);
        }
        if (quantity != 1) setQuantity(1);
    }

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
                            {capitaliseFirstCharWords(props.product.product)}
                        </h2>
                        <div className="mb-20 flex-row">
                            <QuantityCounter
                                quantity={[quantity, setQuantity]}
                            />
                            {props.product.options &&
                                props.product.options.map(
                                    (subArray: any, index: number) => (
                                        <select
                                            key={subArray}
                                            onChange={(
                                                event: ChangeEvent<HTMLSelectElement>
                                            ) => {
                                                const updatedOptions =
                                                    selectedOption
                                                        ? [...selectedOption]
                                                        : [];
                                                updatedOptions[index] =
                                                    event.target.value;
                                                setSelectedOption(
                                                    updatedOptions
                                                );
                                            }}
                                            value={
                                                selectedOption
                                                    ? selectedOption[index]
                                                    : ''
                                            }
                                            className="mx-2"
                                        >
                                            {subArray.map((element: string) => (
                                                <option key={element}>
                                                    {capitaliseFirstChar(
                                                        element
                                                    )}
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
