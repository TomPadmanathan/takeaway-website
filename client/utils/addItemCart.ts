export default function addItemCart(data: any, setCart: any) {
    data.forEach((e: any) => {
        setCart((prevCart: any) => [...prevCart, e]);
    });
}
