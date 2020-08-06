import {
    Column,
    CreatedAt,
    Model,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';

@Table({modelName: 'hgf_attendants'})
export class AttendantsEntity extends Model<AttendantsEntity> {

    @Column({primaryKey: true,})
    attendant_id: number

    @Column
    gas_station_id: number

    @Column
    gas_station_social_reason: string

    @Column
    gas_station_fantasy_name: string

    @Column
    nfc_id: number

    @Column
    external_id: string

    @Column
    cpf: string

    @Column
    name: string

    @Column
    cellphone: string

    @Column
    email: string

    @Column
    password: string

    @Column
    cash_in_hands: number

    @Column
    rating: number

    @Column
    premmia: number

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

}