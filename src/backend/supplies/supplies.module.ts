import {HttpModule, Module} from '@nestjs/common';
import {SuppliesService} from './supplies.service';
import {SuppliesController} from './supplies.controller';
import {suppliesProviders} from "./supplies.provider";
import {ServiceService} from "../service/service.service";
import {serviceProviders} from "../service/service.provider";

@Module({
    imports: [HttpModule],
    providers: [ServiceService,...serviceProviders,SuppliesService, ...suppliesProviders],
    controllers: [SuppliesController]
})
export class SuppliesModule {
}
