import { product, products } from '@/interfaces/products';
import { config } from '@/interfaces/config';

export default async function calculateCheckoutPricesFromServerSide(
    idOfElementsInCart: number[]
): Promise<number> {
    const productsRes = await fetch(
        process.env.NEXT_PUBLIC_URL + '/api/products'
    );
    const productsData: products = await productsRes.json();

    let subTotal: number = 0;

    idOfElementsInCart.forEach((element: number) => {
        productsData.forEach((secondElement: product) => {
            if (element === secondElement.id) subTotal += secondElement.price;
        });
    });

    const configRes = await fetch(process.env.NEXT_PUBLIC_URL + '/api/config');
    const configData: config = await configRes.json();

    const lowOrderFee: number =
        subTotal < configData.lowOrder.feeLimit
            ? configData.lowOrder.feeLimit - subTotal >
              configData.lowOrder.maxFee
                ? configData.lowOrder.maxFee
                : configData.lowOrder.feeLimit - subTotal
            : 0;
    const deliveryFee: number = configData.delivery.fee;
    const total: number = subTotal + lowOrderFee + deliveryFee;

    return total;
}
