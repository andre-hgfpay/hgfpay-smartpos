import {
    Column,
    CreatedAt, DataType,
    Model,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';

@Table({modelName: 'hgf_service'})
export class ServiceEntity extends Model<ServiceEntity> {

    @Column({
        primaryKey: true,
        autoIncrement: true,
    })
    id: number

    @Column
    method: string

    @Column
    req: string

    @Column(DataType.TEXT)
    resp: string

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

}