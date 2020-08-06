import {Controller, Get, Param, Put, Query} from '@nestjs/common';
import {ApiParam, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {SuppliesDto} from "./dto/supplies.dto";
import {SuppliesService} from "./supplies.service";

@ApiTags('Supplies')
@Controller('supplies')
export class SuppliesController {

    constructor(private suppliesService:SuppliesService) {
    }

    @Get('pos/:id')
    @ApiResponse({type:[SuppliesDto]})
    @ApiQuery({ name: 'attendant_id', type: String, required: false })
    @ApiQuery({ name: 'pump_number', type: String, required: false })
    @ApiParam({
        name: 'id',
        type: String
    })
    index(
        @Query() filter:any,
        @Param('id') pos_id: string,
    ){
        return this.suppliesService.index(filter,pos_id);
    }

    @Put('gasStation/:gasStation/supply_key/:supplyKey/status/:status')
    @ApiParam({
        name: 'gasStation',
        type: String
    })
    @ApiParam({
        name: 'supplyKey',
        type: String
    })@ApiParam({
        name: 'status',
        type: String
    })
    status(
        @Param('gasStation') gasStation: string,
        @Param('supplyKey') supplyKey: string,
        @Param('status') status: string,
    ){
        return this.suppliesService.status(supplyKey,status);
    }

    @Get('currentStatus/gasStations/:gasStation/supplyKey/:supplyKey')
    @ApiParam({
        name: 'gasStation',
        type: String
    })
    @ApiParam({
        name: 'supplyKey',
        type: String
    })
    supplies(
        @Param('gasStation') gasStation: string,
        @Param('supplyKey') supplyKey: string,
    ){
        return this.suppliesService.supplies(supplyKey)
    }

}
