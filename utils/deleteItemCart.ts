export default function deleteItemCart(
    index: number,
    cart: any,
    setCart: Function
) {
    const updatedCart = cart.filter((item: any, i: number) => i !== index);
    setCart(updatedCart);
}