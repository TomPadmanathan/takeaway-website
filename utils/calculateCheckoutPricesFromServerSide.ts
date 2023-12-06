// Types/Interfaces
import { product, products } from '@/interfaces/products';

export default async function calculateCheckoutPricesFromServerSide(
    idOfElementsInCart: number[]
): Promise<number> {
    const productsRes: Response = await fetch(
        process.env.NEXT_PUBLIC_URL + '/api/products'
    );
    const productsData: products = await productsRes.json();

    let subTotal: number = 0;

    idOfElementsInCart.forEach((element: number) => {
        productsData.forEach((secondElement: product) => {
            if (element === secondElement.id) subTotal += secondElement.price;
        });
    });

    const lowOrderFee: number =
        subTotal < +(process.env.NEXT_PUBLIC_FEE_LIMIT as string)
            ? +(process.env.NEXT_PUBLIC_FEE_LIMIT as string) - subTotal >
              +(process.env.NEXT_PUBLIC_MAX_FEE as string)
                ? +(process.env.NEXT_PUBLIC_MAX_FEE as string)
                : +(process.env.NEXT_PUBLIC_FEE_LIMIT as string) - subTotal
            : 0;
    const deliveryFee: number = +(process.env
        .NEXT_PUBLIC_DELIVERY_FEE as string);
    const total: number = subTotal + lowOrderFee + deliveryFee;

    return total;
}
