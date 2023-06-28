export interface cartItem {
    product: string;
    price: number;
    image: any;
    category: string[];
    options?: string[];
    id: number;
}
export type cart = cartItem[];
