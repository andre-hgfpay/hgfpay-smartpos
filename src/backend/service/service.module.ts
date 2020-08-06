import {HttpModule, Module} from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import {serviceProviders} from "./service.provider";

@Module({
  imports: [HttpModule],
  providers: [ServiceService,...serviceProviders],
  controllers: [ServiceController]
})
export class ServiceModule {}
