import { setCart } from '@/interfaces/cart';
export default function addItemCart(data: any, setCart: setCart) {
    data.forEach((e: any) => {
        setCart((prevCart: any) => [...prevCart, e]);
    });
}
