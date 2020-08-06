import {Body, Controller, Delete, Get, HttpCode, Param, Post} from '@nestjs/common';
import {ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CartsDto, CreateCartsDto} from "./dto/carts.dto";
import {retorne} from "../attendants/dto/attendants.dto";
import {CartsService} from "./carts.service";
import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

@ApiTags('Carts')
@Controller('carts')
export class CartsController {

    constructor(private cartsService: CartsService) {
    }

    @Get('pos/:pos_id')
    @HttpCode(200)
    @ApiResponse({type: [CartsDto]})
    @ApiParam({
        name: 'pos_id',
        type: String
    })
    async index(
        @Param('pos_id') pos_id: string,
    ) {
        return new retorne('cart', await this.cartsService.index(pos_id))
    }

    @Post()
    @HttpCode(200)
    @ApiModelProperty({type: {CreateCartsDto}})
    @ApiResponse({type: CartsDto})
    async create(
        @Body() createCartsDto: CreateCartsDto,
    ) {
        return new retorne('cart', await this.cartsService.create(createCartsDto))
    }

    @Delete('/:id/pos/:pos_id')
    @ApiParam({
        name: 'id',
        type: String
    })
    @ApiParam({
        name: 'pos_id',
        type: String
    })
    delete(
        @Param('id') id: string,
        @Param('pos_id') pos_id: string,
    ) {
        return this.cartsService.delete(id, pos_id);
    }

    @Post('integration')
    @HttpCode(200)
    integration(){
        return new retorne("[\"Produto disponivel!\"]",'')
    }

}
