import {HttpModule, Module} from '@nestjs/common';
import {AttendantsService} from './attendants.service';
import {AttendantsController} from './attendants.controller';
import {attendantsProviders} from "./attendants.provider";
import {ServiceService} from "../service/service.service";
import {serviceProviders} from "../service/service.provider";

@Module({
    imports: [HttpModule],
    providers: [ServiceService, ...serviceProviders, AttendantsService, ...attendantsProviders],
    controllers: [AttendantsController]
})
export class AttendantsModule {
}
