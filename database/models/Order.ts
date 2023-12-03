// Packages
import {
    Model,
    Table,
    Column,
    PrimaryKey,
    Default,
    BeforeValidate,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

// Models
import User from '@/database/models/User';

// Types/Interfaces
import type { Optional } from 'sequelize';
import { NullishPropertiesOf } from 'sequelize/types/utils';

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

    @ForeignKey(() => User)
    @Column
    userId!: string;

    @Column
    orderNote!: string;

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

    @BelongsTo(() => User, {
        foreignKey: 'userId', // Name of the foreign key field in the Order model
        targetKey: 'userId', // Name of the primary key field in the User model
        as: 'user', // Alias for the association
    })
    user!: User;

    constructor(
        values?: Record<string, any> | null,
        options?: { isNewRecord?: boolean }
    ) {
        super(values as Optional<Order, NullishPropertiesOf<Order>>, options);
        this.user = new User();
    }

    @BeforeValidate
    static generateOrderId(instance: Order) {
        if (!instance.orderId) instance.orderId = uuidv4();
    }
}
