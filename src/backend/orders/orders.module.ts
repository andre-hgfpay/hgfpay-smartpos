import {HttpModule, Module} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import {cartsProviders} from "../carts/carts.provider";

@Module({
  imports: [HttpModule],
  providers: [OrdersService,...cartsProviders],
  controllers: [OrdersController]
})
export class OrdersModule {}
