export default function deleteItemCart(i: number, cart: any, setCart: any) {
    const copy = [...cart];
    copy.splice(i, 1);
    setCart(copy);
}
