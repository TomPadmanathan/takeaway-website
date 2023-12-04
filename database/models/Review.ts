// Packages
import {
    Model,
    Table,
    Column,
    PrimaryKey,
    Default,
    BeforeValidate,
    BelongsTo,
    ForeignKey,
    Unique,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

// Models
import Order from '@/database/models/Order';

@Table({
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['orderId'],
        },
    ],
})
export default class Review extends Model<Review> {
    @PrimaryKey
    @Default((): string => uuidv4())
    @Column
    reviewId!: string;

    @Column
    rating!: 1 | 2 | 3 | 4 | 5;

    @Column
    message!: string;

    @ForeignKey(() => Order)
    @Unique(true)
    @Column
    orderId!: string;

    @Default('pending')
    @Column
    status!: string;

    @Default((): string => String(Date.now()))
    @Column
    timestamp!: string;

    @BelongsTo(() => Order, {
        foreignKey: 'orderId', // Name of the foreign key field in the Order model
        targetKey: 'orderId', // Name of the primary key field in the reveiw model
        as: 'order', // Alias for the association
    })
    order!: Order;

    @BeforeValidate
    static generateOrderId(instance: Review) {
        if (!instance.reviewId) instance.reviewId = uuidv4();
    }
}
