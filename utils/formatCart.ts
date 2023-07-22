import { cart } from '@/interfaces/cart';
export default function formatCart(cart: cart) {
    const modifiedCart = cart.reduce((acc: any[], item: any) => {
        const existingItem = acc.find(
            cartItem =>
                cartItem.id === item.id &&
                JSON.stringify(cartItem.options) ===
                    JSON.stringify(item.options)
        );
        if (existingItem) {
            existingItem.quantity += 1;
            existingItem.totalPrice += existingItem.price;
        } else acc.push({ ...item, quantity: 1, totalPrice: item.price });
        return acc;
    }, []);
    return modifiedCart;
}
