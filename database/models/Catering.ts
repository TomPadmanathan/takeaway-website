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

// Types/interfaces
import { Optional } from 'sequelize';
import { NullishPropertiesOf } from 'sequelize/types/utils';

// Models
import User from '@/database/models/User';

@Table({
    timestamps: false,
})
export default class Catering extends Model<Catering> {
    @Default((): string => String(Date.now()))
    @Column
    timestamp!: string;

    @ForeignKey(() => User)
    @Column
    userId!: string;

    @Column
    eventType!: string;

    @Column
    estimatedDate!: string;

    @Column
    dietaryRequirements!: string;

    @Column
    estimatedAttendes!: number;

    @PrimaryKey
    @Default((): string => uuidv4())
    @Column
    cateringId!: string;

    @BelongsTo(() => User, {
        foreignKey: 'userId',
        targetKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
    })
    user!: User;

    constructor(
        values?: Record<string, any> | null,
        options?: { isNewRecord?: boolean }
    ) {
        super(
            values as Optional<Catering, NullishPropertiesOf<Catering>>,
            options
        );
        this.user = new User();
    }

    @BeforeValidate
    static generateCateringId(instance: Catering) {
        if (!instance.cateringId) instance.cateringId = uuidv4();
    }
}
