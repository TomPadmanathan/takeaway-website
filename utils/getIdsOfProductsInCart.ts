export default function getIdsOfProductsInCart(cart: any) {
    let idOfElementsInCart: number[] = [];
    cart.forEach((element: any) => {
        idOfElementsInCart.push(element.id);
    });
    return idOfElementsInCart;
}
