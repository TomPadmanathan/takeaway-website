import { cart, cartItem } from '@/interfaces/cart';
import { config } from '@/interfaces/config';

export default class CalculateCheckoutPrices {
    subTotal: number;
    lowOrderFee: number;
    deliveryFee: number;
    total: number;
    constructor(cart: cart, siteConfig: config) {
        this.subTotal = cart.reduce(
            (accumulator: number, cartItem: cartItem) =>
                accumulator + cartItem.price,
            0
        );

        this.lowOrderFee =
            this.subTotal < siteConfig.lowOrder.feeLimit
                ? siteConfig.lowOrder.feeLimit - this.subTotal >
                  siteConfig.lowOrder.maxFee
                    ? siteConfig.lowOrder.maxFee
                    : siteConfig.lowOrder.feeLimit - this.subTotal
                : 0;
        this.deliveryFee = siteConfig.delivery.fee;
        this.total = this.subTotal + this.lowOrderFee + this.deliveryFee;
    }
}
