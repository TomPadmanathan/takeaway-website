// Packages
import {
    Model,
    Table,
    Column,
    PrimaryKey,
    Default,
    BeforeValidate,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

@Table({
    timestamps: false,
})
export default class Order extends Model<Order> {
    @Default('pending')
    @Column
    status!: string;

    @Default((): string => String(Date.now()))
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
    @Default((): string => uuidv4())
    @Column
    orderId!: string;

    @BeforeValidate
    static generateUserId(instance: Order) {
        if (!instance.orderId) instance.orderId = uuidv4();
    }
}
