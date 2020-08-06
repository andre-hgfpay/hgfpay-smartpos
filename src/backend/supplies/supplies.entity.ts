import {
    Column,
    CreatedAt,
    Model,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';

@Table({modelName: 'hgf_supplies'})
export class SuppliesEntity extends Model<SuppliesEntity> {

    @Column({
        primaryKey: true,
        autoIncrement: true,
    })
    supply_id: number

    @Column
    supply_key: string

    @Column
    pos_id: number

    @Column
    description: string

    @Column
    price: string

    @Column
    quantity: string

    @Column
    total: string

    @Column
    date_supply: Date

    @Column
    pump_number: string

    @Column
    supply_type_id: number

    @Column
    status: number

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

}