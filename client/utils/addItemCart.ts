export default function addItemCart(data: any, cart: any, setCart: any) {
    setCart((prevCart: any) => [...prevCart, data]);
}
