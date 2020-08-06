import {Inject, Injectable} from '@nestjs/common';
import {CartsEntity} from "./carts.entity";
import {Http} from "../config/httpException";
import {CartsDto, CreateCartsDto} from "./dto/carts.dto";
import {SuppliesService} from "../supplies/supplies.service";
import {ServiceService} from "../service/service.service";
import {retorne} from "../attendants/dto/attendants.dto";
import {ProductsService} from "../products/products.service";

@Injectable()
export class CartsService {

    constructor(
        @Inject('CartsRepository')
        private cartsRepository: typeof CartsEntity,
        private suppliesService: SuppliesService,
        private productService: ProductsService,
        private serviceService: ServiceService) {
    }

    async index(pos_id: string) {
        const carts = await this.cartsRepository.findAll<CartsEntity>({where: {pos_id: pos_id}});
        if (carts.length == 0) {
            Http.notFound('Carrinho')
        }
        return carts.map(cart => new CartsDto(cart));
    }

    async create(createCartsDto: CreateCartsDto) {
        if (createCartsDto.supply_id) {
            try {
                const supplies = await this.suppliesService.findById(createCartsDto.supply_id)
                if (!supplies) {
                    Http.notFound("Abastecimentos não encontrados!")
                }
                const carts = new CartsEntity()
                carts.description = supplies.description;
                carts.image_base64 = '';
                carts.gas_station_product_id = supplies.supply_type_id;
                carts.pos_id = createCartsDto.pos_id;
                carts.product_type_id = supplies.supply_type_id;
                carts.price = supplies.price;
                carts.quantity = supplies.quantity;
                carts.supply_id = supplies.supply_key;
                carts.total = supplies.total;
                carts.save();
                return "70";
            } catch (e) {
                console.log(e);
                Http.badRequest()
            }

        } else {
            try {
                console.log(createCartsDto.gas_station_product_id);
                const product = await this.productService.findById(createCartsDto.gas_station_product_id)
                if (!product) {
                    Http.notFound("Produto não encontrados!")
                }
                const carts = new CartsEntity()
                carts.description = product.description;
                carts.image_base64 = '';
                carts.gas_station_product_id = product.id;
                carts.pos_id = createCartsDto.pos_id;
                carts.product_type_id = product.product_type_id;
                carts.price = product.price.toString();
                carts.quantity = createCartsDto.quantity;
                carts.supply_id = "0";
                carts.total = (Number(createCartsDto.quantity) * product.price).toString();
                carts.save();
                return "70";
            } catch (e) {
                console.log(e);
                Http.badRequest()
            }
        }
    }

    async delete(id: string, pos_id: string) {
        const carts = await this.cartsRepository.findOne<CartsEntity>({where: {pos_id: pos_id,id:id}});
        if (!carts) {
            Http.notFound('Carrinho')
        }
        if(carts.supply_id != '0'){
            const token = await this.serviceService.token();
            const pos = await this.serviceService.pos(token)
            let serial: string = ''
            pos.map((pos: any) => {
                if (pos.id == pos_id) {
                    serial = pos.serial_number
                }
            })
            await this.serviceService.create('SA', 'SA|SK|' + carts.supply_id + '|' + token.gas_stations[0].cnpj + '|' + serial)
        }
        carts.destroy();
        return new retorne('service',[])
    }


}
