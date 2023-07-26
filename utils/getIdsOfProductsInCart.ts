import { cart } from '@/interfaces/cart';
export default function getIdsOfProductsInCart(cart: cart): number[] {
    let idOfElementsInCart: number[] = [];
    cart.forEach((element: any) => idOfElementsInCart.push(element.id));
    return idOfElementsInCart;
}
