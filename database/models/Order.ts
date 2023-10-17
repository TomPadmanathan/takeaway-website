import {
    Model,
    Table,
    Column,
    PrimaryKey,
    AutoIncrement,
} from 'sequelize-typescript';

@Table({
    timestamps: false,
})
@Table
class Order extends Model<Order> {
    @Column
    status!: string;

    @Column
    timestamp!: string;

    @Column
    email!: string;

    @Column
    name!: string;

    @Column
    phoneNumber!: string;

    @Column
    cityTown!: string;

    @Column
    addressLine1!: string;

    @Column
    addressLine2!: string;

    @Column
    postCode!: string;

    @Column
    orderNote!: string;

    @Column
    stripeCustomerId!: string;

    @Column
    stripePaymentId!: string;

    @Column
    products!: string;

    @Column
    totalPayment!: number;

    @PrimaryKey
    @AutoIncrement
    @Column
    orderId!: number;
}

export default Order;
