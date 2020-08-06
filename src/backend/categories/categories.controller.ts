import {Controller, Get, Param} from '@nestjs/common';
import {ApiParam, ApiProperty, ApiTags} from "@nestjs/swagger";
import {CategoriesDto} from "./dto/categories.dto";
import {CategoriesService} from "./categories.service";

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {

    constructor(private categoriesService: CategoriesService) {
    }

    @ApiProperty({type: CategoriesDto})
    @Get('gasStation/:gasStation')
    @ApiParam({
        name: 'gasStation',
    })
    index(
        @Param('gasStation') gasStation: number,
    ) {
        return this.categoriesService.index(gasStation);
    }

    @ApiProperty({type: CategoriesDto})
    @Get('integration')

    integration() {
        return this.categoriesService.integration();
    }

}
