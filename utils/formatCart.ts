import { cart, modifiedCart, cartItem } from '@/interfaces/cart';

export default function formatCart(cart: cart): modifiedCart {
    const modifiedCart = cart.reduce((accumulator: any[], item: cartItem) => {
        const existingItem = accumulator.find(
            cartItem =>
                cartItem.id === item.id &&
                JSON.stringify(cartItem.options) ===
                    JSON.stringify(item.options)
        );
        if (existingItem) {
            existingItem.quantity += 1;
            existingItem.totalPrice += existingItem.price;
        } else
            accumulator.push({ ...item, quantity: 1, totalPrice: item.price });
        return accumulator;
    }, []);
    return modifiedCart;
}
