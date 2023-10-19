interface props {
    quantity: [
        quantity: number,
        setQuantity: React.Dispatch<React.SetStateAction<number>>
    ];
}

export default function QuantityCounter(props: props): JSX.Element {
    const [quantity, setQuantity] = props.quantity;
    return (
        <>
            <button
                onClick={(): void => {
                    quantity > 1 ? setQuantity(quantity - 1) : null;
                }}
            >
                -
            </button>
            <span className="mx-4">{quantity}</span>
            <button onClick={(): void => setQuantity(quantity + 1)}>+</button>
        </>
    );
}
