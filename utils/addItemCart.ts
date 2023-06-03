export default function addItemCart(data: any, setCart: Function) {
    data.forEach((e: any) => {
        setCart((prevCart: any) => [...prevCart, e]);
    });
}
