export interface cartItem {
    product: string;
    price: number;
    image: any;
    category: string[];
    id: number;
    options?: string[][] | string[];
}
export type cart = cartItem[];

export type setCart = React.Dispatch<React.SetStateAction<cart>>;

export interface modifiedCartItem extends cartItem {
    quantity: number;
    totalPrice: number;
}

export type modifiedCart = modifiedCartItem[];
