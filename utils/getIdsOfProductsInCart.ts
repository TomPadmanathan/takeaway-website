import { cart, cartItem } from '@/interfaces/cart';

export function getIdOfElementsInCart(cart: cart): number[] {
    let idOfElementsInCart: number[] = [];
    cart.forEach((element: cartItem) => idOfElementsInCart.push(element.id));
    return idOfElementsInCart;
}

export function getIdsAndOptionsInCart(cart: cart) {
    let idOfElementsInCart: any = [];
    cart.forEach((element: cartItem) => {
        const newArray = [];
        newArray.push(element.id);
        newArray.push(element.options);
        idOfElementsInCart.push(newArray);
    });

    return idOfElementsInCart;
}
