import {ApiProperty} from "@nestjs/swagger";
export class ProductsDto {

    @ApiProperty()
    readonly gas_station_product_id: number
    @ApiProperty()
    readonly product_id: number
    @ApiProperty()
    readonly product_type_id: number
    @ApiProperty()
    readonly description: string
    @ApiProperty()
    readonly ean: string
    @ApiProperty()
    readonly brand: []
    @ApiProperty()
    readonly image_path: string
    @ApiProperty()
    readonly image_base64: string
    @ApiProperty()
    readonly price: number
    @ApiProperty()
    readonly price_cd: number
    @ApiProperty()
    readonly price_cc: number
    @ApiProperty()
    readonly price_pz: number
    @ApiProperty()
    readonly status: number
    @ApiProperty()
    readonly category_id: [number]
    @ApiProperty()
    readonly points: number
    @ApiProperty()
    readonly points_price: number
    @ApiProperty()
    readonly date_added: string
    @ApiProperty()
    readonly date_modified: string


    constructor(product: any) {
        this.gas_station_product_id = product.id;
        this.product_id = product.id;
        this.product_type_id = product.product_type_id;
        this.description = product.description;
        this.ean = product.ean;
        this.brand = [];
        this.image_path = product.image_path;
        this.image_base64 = product.image_base64;
        this.price = product.price;
        this.price_cd = product.price_cd;
        this.price_cc = product.price_cc;
        this.price_pz = product.price_pz;
        this.status = product.status;
        this.category_id = product.category_id;
        this.points = product.points;
        this.points_price = product.points_price;
        this.date_added = product.date_added;
        this.date_modified = product.date_modified;
    }
}

export class CreateProductsDto {

    @ApiProperty()
    readonly id: number
    @ApiProperty()
    readonly product_type_id: number
    @ApiProperty()
    readonly description: string
    @ApiProperty()
    readonly ean: string
    @ApiProperty()
    readonly image_path: string
    @ApiProperty()
    readonly image_base64: string
    @ApiProperty()
    readonly price: number
    @ApiProperty()
    readonly price_cd: number
    @ApiProperty()
    readonly price_cc: number
    @ApiProperty()
    readonly price_pz: number
    @ApiProperty()
    readonly status: number
    @ApiProperty()
    readonly points: number
    @ApiProperty()
    readonly points_price: number
    @ApiProperty()
    readonly date_added: string
    @ApiProperty()
    readonly date_modified: string


    constructor(product: any) {
        this.id = product.product_id;
        this.product_type_id = product.product_type_id;
        this.description = product.description;
        this.ean = product.ean;
        this.image_path = product.image_path;
        this.image_base64 = product.image_base64;
        this.price = product.price;
        this.price_cd = product.price_cd;
        this.price_cc = product.price_cc;
        this.price_pz = product.price_pz;
        this.status = product.status;
        this.points = product.points;
        this.points_price = product.points_price;
        this.date_added = product.date_added;
        this.date_modified = product.date_modified;
    }
}