import {HttpModule, Module} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import {productsCategoryProviders, productsProviders} from "./products.provider";
import {ServiceService} from "../service/service.service";
import {serviceProviders} from "../service/service.provider";

@Module({ imports: [HttpModule],
  providers: [ServiceService, ...serviceProviders,ProductsService,...productsProviders,...productsCategoryProviders],
  controllers: [ProductsController]
})
export class ProductsModule {}
