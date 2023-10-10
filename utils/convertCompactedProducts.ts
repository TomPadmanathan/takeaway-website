import { product, products } from '@/interfaces/products';

export default async function convertCompactedProducts(products: string) {
    type oldProduct = [number, options?: string[][]];
    type oldProducts = oldProduct[];

    const productsRes = await fetch('http://localhost:3000/api/products');
    const productsData: products = await productsRes.json();
    const oldProducts: oldProducts = JSON.parse(products);
    let newItemArr: any = [];

    oldProducts.forEach((element: oldProduct): void => {
        productsData.forEach((element2: product): void => {
            if (element[0] === element2.id)
                newItemArr.push({ ...element2, options: element[1] });
        });
    });
    return newItemArr;
}
