import { CartProps } from '../interfaces/checkin';

export default function ProductTab(props: CartProps) {
    return (
        <>
            <div
                className={`absolute transition-all duration-500 right-5 top-5 w-72 border border-black z-1 bg-slate-600 ${
                    props.isVisible ? 'translate-x-0' : 'translate-x-96'
                }`}
            >
                <h2 className="text-3xl text-center">Cart</h2>
                <span className="block text-end">Sub-Total: $5.00</span>
                <span className="block text-end">Low Order Fee: $5.00</span>
                <span className="block text-end">Total: $10.00</span>
            </div>
        </>
    );
}
