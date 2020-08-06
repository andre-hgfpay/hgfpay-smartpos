import {
    Column,
    CreatedAt,
    Model,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';

@Table({modelName: 'hgf_carts'})
export class CartsEntity extends Model<CartsEntity> {

    @Column({
        primaryKey: true,
        autoIncrement: true,
    })
    id: number

    @Column
    pos_id: number

    @Column
    gas_station_product_id: number

    @Column
    product_type_id: number

    @Column
    supply_id: string

    @Column
    description: string

    @Column
    quantity: string

    @Column
    price: string

    @Column
    total: string

    @Column
    image_base64: string

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

}