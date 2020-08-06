import {Controller, Get, Query} from '@nestjs/common';
import {ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ProductsDto} from "./dto/products.dto";
import {ProductsService} from "./products.service";

@Controller('products')
@ApiTags('Products')
export class ProductsController {

    constructor(private productService: ProductsService) {
    }

    @Get('pos/:pos')
    @ApiResponse({type: [ProductsDto]})
    @ApiQuery({name: 'category_id', type: String, required: false})
    index(
        @Query() filter: any,
    ) {
        return this.productService.index(filter);
    }

    @Get('gasStations/:gas')
    @ApiResponse({type: [ProductsDto]})
    @ApiQuery({name: 'product_info', type: String, required: false})
    indexGas(
        @Query() filter: any,
    ) {
        return this.productService.index(filter);
    }

    @Get('integration')
    integration(){
        return this.productService.integration();
    }


}
