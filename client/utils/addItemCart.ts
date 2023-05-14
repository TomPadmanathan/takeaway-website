export default function addItemCart(data: any, setCart: any) {
    setCart((prevCart: any) => [...prevCart, data]);
}
