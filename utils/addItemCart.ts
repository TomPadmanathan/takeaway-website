import { setCart } from '@/interfaces/cart';
import { products } from '@/interfaces/products';
export default function addItemCart(data: products, setCart: setCart): void {
    data.forEach((element: any) =>
        setCart((prevCart: any) => [...prevCart, element])
    );
}
