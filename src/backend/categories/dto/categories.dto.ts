import {ApiProperty} from "@nestjs/swagger";
import {CategoriesEntity} from "../categories.entity";

export class CategoriesDto {

    @ApiProperty()
    readonly category_gas_station_id: number

    @ApiProperty()
    readonly category_id: number

    @ApiProperty()
    readonly gas_station_id: number

    @ApiProperty()
    readonly description: string

    @ApiProperty()
    readonly parent_id: number

    @ApiProperty()
    readonly sort_order: number

    @ApiProperty()
    readonly subcategory: number

    @ApiProperty()
    readonly status: number


    constructor(category: CategoriesEntity, gas_station_id: number) {
        this.category_gas_station_id = 0;
        this.category_id = category.id;
        this.gas_station_id = gas_station_id;
        this.description = category.description;
        this.parent_id = 0;
        this.sort_order = 0;
        this.subcategory = 0;
        this.status = 1;
    }
}

export class CreateCategoriesDto {

    @ApiProperty()
    readonly id: number

    @ApiProperty()
    readonly description: string

    constructor(categories: any) {
        this.id = categories.category_id;
        this.description = categories.description;
    }
}

export class CreateProductCategoriesDto {

    @ApiProperty()
    readonly category_id: number

    @ApiProperty()
    readonly product_id: number

    constructor(categories: any,product_id:any) {
        this.category_id = categories;
        this.product_id = product_id;
    }
}

