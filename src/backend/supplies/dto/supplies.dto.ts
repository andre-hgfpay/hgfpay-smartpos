import {ApiProperty} from "@nestjs/swagger";
import {SuppliesEntity} from "../supplies.entity";

export class SuppliesDto {
    @ApiProperty()
    readonly supply_id: number

    @ApiProperty()
    readonly supply_key: number

    @ApiProperty()
    readonly pump_number: number

    @ApiProperty()
    readonly description: string

    @ApiProperty()
    readonly price: string

    @ApiProperty()
    readonly price_cd: 0

    @ApiProperty()
    readonly price_cc: 0

    @ApiProperty()
    readonly price_pz: 0

    @ApiProperty()
    readonly quantity: string

    @ApiProperty()
    readonly total: string

    @ApiProperty()
    readonly total_cd: 0

    @ApiProperty()
    readonly total_cc: 0

    @ApiProperty()
    readonly total_pz: 0

    @ApiProperty()
    readonly status_id: number

    @ApiProperty()
    readonly status_description: string

    @ApiProperty()
    readonly status_color: string

    @ApiProperty()
    readonly date_added: string

    @ApiProperty()
    readonly date_supply: string


    constructor(supply: SuppliesEntity) {
        this.supply_id = supply.supply_id;
        this.supply_key = Number(supply.supply_key);
        this.pump_number = Number(supply.pump_number);
        this.description = supply.description;
        this.price = supply.price.replace('.','').replace(',','.');
        this.price_cd = 0;
        this.price_cc = 0;
        this.price_pz = 0;
        this.quantity = supply.quantity.replace('.','').replace(',','.');
        this.total = supply.total.replace('.','').replace(',','.');
        this.total_cd = 0;
        this.total_cc = 0;
        this.total_pz = 0;
        this.status_id = 1;
        this.status_description = "Aguardando Pagamento";
        this.status_color = "#CCCCCC";
        this.date_added = "05\/03\/18 13:42:11";
        this.date_supply = "05\/03\/18 13:42:11";
    }
}

export class CreateSuppliesDto {

    @ApiProperty()
    readonly supply_key: string

    @ApiProperty()
    readonly pump_number: string

    @ApiProperty()
    readonly description: string

    @ApiProperty()
    readonly price: string

    @ApiProperty()
    readonly quantity: string

    @ApiProperty()
    readonly total: string

    @ApiProperty()
    readonly status: 1

    @ApiProperty()
    readonly date_added: Date

    @ApiProperty()
    readonly pos_id: number

    @ApiProperty()
    readonly supply_type_id: number


    constructor(pos_id: number, data: any) {
        this.supply_key = data.supply_key;
        this.pump_number = data.pump_number;
        this.description = data.description;
        this.price = data.price;
        this.quantity = data.quantity;
        this.total = data.total;
        this.status = 1;
        this.date_added = data.date_added;
        this.pos_id = pos_id;
        this.supply_type_id = Number(data.supply_type_id);
    }
}