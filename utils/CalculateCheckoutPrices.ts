export default class CalculateCheckoutPrices {
    subTotal: number;
    lowOrderFee: number;
    deliveryFee: number;
    total: number;
    constructor(cart: any, config: any) {
        this.subTotal = cart.reduce(
            (acc: any, item: any) => acc + item.price,
            0
        );
        this.lowOrderFee =
            this.subTotal < config.lowOrder.feeLimit
                ? config.lowOrder.feeLimit - this.subTotal >
                  config.lowOrder.maxFee
                    ? config.lowOrder.maxFee
                    : config.lowOrder.feeLimit - this.subTotal
                : 0;
        this.deliveryFee = config.delivery.fee;
        this.total = this.subTotal + this.lowOrderFee + this.deliveryFee;
    }
}
