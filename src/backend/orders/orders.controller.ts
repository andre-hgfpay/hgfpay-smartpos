import {Body, Controller, HttpCode, Post} from '@nestjs/common';
import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {OrdersDto} from "./dto/orders.dto";
import {OrdersService} from "./orders.service";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {

    constructor(private orderService:OrdersService) {
    }

    @Post()
    @HttpCode(200)
    @ApiModelProperty({type:OrdersDto})
    create(
        @Body() ordersDto:OrdersDto
    ){
        return this.orderService.sendOrder(ordersDto)
    }

}
