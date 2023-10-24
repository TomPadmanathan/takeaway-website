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
export default class User extends Model<User> {
    @PrimaryKey
    @Default((): string => uuidv4())
    @Column
    userId!: string;

    @Default((): string => String(Date.now()))
    @Column
    createdAt!: string;

    @Column
    email!: string;

    @Column
    password!: string;

    @Column
    phoneNumber!: string;

    @Column
    forename!: string;

    @Column
    surname!: string;

    @Column
    userType!: string;

    @Column
    addressLine1!: string;

    @Column
    addressLine2!: string;

    @Column
    postcode!: string;

    @Column
    cityTown!: string;

    @BeforeValidate
    static generateUserId(instance: User) {
        if (!instance.userId) instance.userId = uuidv4();
    }
}
