import {HttpModule, Module} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import {categoriesProviders} from "./categories.provider";
import {ServiceService} from "../service/service.service";
import {serviceProviders} from "../service/service.provider";

@Module({
  imports: [HttpModule],
  providers: [ServiceService, ...serviceProviders,CategoriesService,...categoriesProviders],
  controllers: [CategoriesController]
})
export class CategoriesModule {}
