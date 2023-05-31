export default function QuantityCounter(props: any) {
    const [quantity, setQuantity] = props.quantity;
    return (
        <>
            <button
                onClick={() => {
                    quantity > 1 ? setQuantity(quantity - 1) : null;
                }}
            >
                -
            </button>
            <span className="mx-4">{quantity}</span>
            <button
                onClick={() => {
                    setQuantity(quantity + 1);
                }}
            >
                +
            </button>
        </>
    );
}
