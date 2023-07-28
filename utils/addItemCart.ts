import { setCart, cart } from '@/interfaces/cart';
import { products, product } from '@/interfaces/products';
export default function addItemCart(data: products, setCart: setCart): void {
    data.forEach((element: product) =>
        setCart((prevCart: cart) => [...prevCart, element])
    );
}
