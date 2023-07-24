export interface product {
    product: string;
    price: number;
    image: any;
    category: string[];
    options: string[][];
    id: number;
}
export type products = product[];
