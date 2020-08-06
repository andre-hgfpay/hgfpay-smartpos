import {Controller, Get, HttpCode} from '@nestjs/common';
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {AttendantsDto} from "./dto/attendants.dto";
import {AttendantsService} from "./attendants.service";

@ApiTags('Attendants')
@Controller('attendants')
export class AttendantsController {

    constructor(private attendantsService: AttendantsService) {
    }

    @Get('pos/:id')
    @HttpCode(200)
    @ApiResponse({type: [AttendantsDto]})
    index() {
        return this.attendantsService.index();
    }

    @Get('integration')
    integration() {
        return this.attendantsService.integration();
    }
}
