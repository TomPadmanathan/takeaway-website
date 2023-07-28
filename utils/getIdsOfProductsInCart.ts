import { cart, cartItem } from '@/interfaces/cart';
export default function getIdsOfProductsInCart(cart: cart): number[] {
    let idOfElementsInCart: number[] = [];
    cart.forEach((element: cartItem) => idOfElementsInCart.push(element.id));
    return idOfElementsInCart;
}
