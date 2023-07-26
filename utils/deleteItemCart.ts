import { cart, setCart } from '@/interfaces/cart';
export default function deleteItemCart(
    index: number,
    cart: cart,
    setCart: setCart
): void {
    const updatedCart = cart.filter(
        (element: any, secondIndex: number) => secondIndex !== index
    );
    setCart(updatedCart);
    if (updatedCart.length === 0) localStorage.removeItem('cart');
}
