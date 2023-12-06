// Types/Interfaces
import { cart, cartItem } from '@/interfaces/cart';

export default class CalculateCheckoutPrices {
    subTotal: number;
    lowOrderFee: number;
    deliveryFee: number;
    total: number;
    constructor(cart: cart) {
        this.subTotal = cart.reduce(
            (accumulator: number, cartItem: cartItem): number =>
                accumulator + cartItem.price,
            0
        );

        this.lowOrderFee =
            this.subTotal < +(process.env.NEXT_PUBLIC_FEE_LIMIT as string)
                ? +(process.env.NEXT_PUBLIC_FEE_LIMIT as string) -
                      this.subTotal >
                  +(process.env.NEXT_PUBLIC_MAX_FEE as string)
                    ? +(process.env.NEXT_PUBLIC_MAX_FEE as string)
                    : +(process.env.NEXT_PUBLIC_FEE_LIMIT as string) -
                      this.subTotal
                : 0;
        this.deliveryFee = +(process.env.NEXT_PUBLIC_DELIVERY_FEE as string);
        this.total = this.subTotal + this.lowOrderFee + this.deliveryFee;
    }
}
