export interface cartItem {
    product: string;
    price: number;
    image: any;
    category: string[];
    options?: string[];
    id: number;
}
export type cart = cartItem[];

export type setCart = React.Dispatch<React.SetStateAction<cart>>;