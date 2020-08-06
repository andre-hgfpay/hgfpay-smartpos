import {ApiProperty} from "@nestjs/swagger";
import {CartsEntity} from "../carts.entity";

export class CartsDto {

    @ApiProperty()
    readonly cart_id: number

    @ApiProperty()
    readonly pos_id: number

    @ApiProperty()
    readonly gas_station_product_id: number

    @ApiProperty()
    readonly product_type_id: number

    @ApiProperty()
    readonly supply_id: number

    @ApiProperty()
    readonly description: string

    @ApiProperty()
    readonly quantity: string

    @ApiProperty()
    readonly price: string

    @ApiProperty()
    readonly total: string

    @ApiProperty()
    readonly image_base64: string

    @ApiProperty()
    readonly price_cd :number;
    @ApiProperty()
    readonly total_cd :number;
    @ApiProperty()
    readonly price_cc :number;
    @ApiProperty()
    readonly total_cc :number;
    @ApiProperty()
    readonly price_pz :number;
    @ApiProperty()
    readonly total_pz :number;

    @ApiProperty()
    readonly date_added:string;

    @ApiProperty()
    readonly status:number;

    constructor(carts: CartsEntity) {
        this.cart_id = carts.id;
        this.pos_id = carts.pos_id;
        this.gas_station_product_id = carts.gas_station_product_id;
        this.product_type_id = carts.product_type_id;
        this.supply_id = Number(carts.supply_id);
        this.description = carts.description;
        this.quantity = carts.quantity.replace(',','.');
        this.price = carts.price.replace(',','.');
        this.total = carts.total.replace(',','.');
        this.price_cd = 0;
        this.total_cd = 0;
        this.price_cc = 0;
        this.total_cc = 0;
        this.price_pz = 0;
        this.total_pz = 0;
        this.image_base64 = carts.image_base64;
        this.date_added = "05\/03\/18 13:42:11";
        this.status = 4;
    }
}

export class CreateCartsDto {
    @ApiProperty()
    readonly pos_id: number

    @ApiProperty()
    readonly gas_station_product_id: number

    @ApiProperty()
    readonly quantity: string

    @ApiProperty()
    readonly supply_id: string
}