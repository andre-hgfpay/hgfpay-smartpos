import {Body, Controller, Get, HttpCode, Param, Post, Put} from '@nestjs/common';
import {ApiParam, ApiProperty, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ClearService, ServiceRequestDto, ServiceRespDto} from "./dto/service.dto";
import {ServiceService} from "./service.service";

@ApiTags('Service')
@Controller('service')
export class ServiceController {

    constructor(private serviceService: ServiceService) {
    }

    @Get('/req/:gas_cnpj')
    @ApiResponse({type: [ServiceRequestDto]})
    @HttpCode(200)
    @ApiParam({
        name: 'gas_cnpj',
        type: String
    })
    index(
        @Param('gas_cnpj') gas_cnpj: string,
    ) {
        return this.serviceService.index(gas_cnpj)
    }

    @Put('/resp/:request_id')
    @ApiProperty({type: ServiceRespDto})
    @HttpCode(200)
    @ApiParam({
        name: 'request_id',
    })
    resp(
        @Body() serviceRespDto: ServiceRespDto,
        @Param('request_id') request_id: number,
    ) {
        return this.serviceService.resp(serviceRespDto, request_id)
    }

    @Post('clear')
    @ApiProperty({type: ClearService})
    clear(
        @Body()clearService: ClearService
    ) {
        return this.serviceService.clear(clearService)
    }

}
