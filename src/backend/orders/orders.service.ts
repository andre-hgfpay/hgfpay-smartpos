import {HttpService, Inject, Injectable} from '@nestjs/common';
import {Http} from "../config/httpException";
import {OrdersDto} from "./dto/orders.dto";
import {CartsEntity} from "../carts/carts.entity";
import {retorne} from "../attendants/dto/attendants.dto";

@Injectable()
export class OrdersService {

    constructor(
        @Inject('CartsRepository')
        private cartsRepository: typeof CartsEntity,
        private httpService: HttpService) {
    }

    async sendOrder(ordersDto: OrdersDto) {
        let body:any =[];
        const carts = await this.cartsRepository.findAll<CartsEntity>({where: {pos_id: ordersDto.pos_id}});
        if(!carts){
            Http.notFound('cart')
        }
        carts.map(cart => {
            body.push({
                gas_station_product_id: cart.gas_station_product_id,
                product_type_id: cart.product_type_id,
                external_id: "",
                supply_id: cart.supply_id,
                description: cart.description,
                quantity: cart.quantity.replace(',','.'),
                price: cart.price.replace(',','.'),
                total:cart.total.replace(',','.'),
                price_cd: 0,
                total_cd: 0,
                price_cc: 0,
                total_cc: 0,
                price_pz: 0,
                total_pz: 0,
                image_base64: "",
                date_added: cart.created_at.toDateString(),
                status: 4
            })
        })
        const token = await this.token()
        const req = await this.httpService.post(process.env.URL_API + 'orders/integrationLocal', {
            pos_id: ordersDto.pos_id.toString(),
            cpf: ordersDto.cpf.toString(),
            vehicle_id: ordersDto.vehicle_id.toString(),
            attendant_id: ordersDto.attendant_id.toString(),
            products: body
        },{
            headers: {
                Authorization: 'Bearer ' + token.authorization
            }
        }).toPromise()
        if(req.status == 200){
            console.log(new retorne('pedido gerado',req.data.data))
            return new retorne('pedido gerado',req.data.data)
        }

    }

    async token() {
        try {
            const req = await this.httpService.post(process.env.URL_API + 'getToken', {
                username: process.env.USER_API,
                password: process.env.PASSWORD_API
            }).toPromise()
            return req.data.data;
        } catch (e) {
            Http.badRequestAuth();
        }
    }

}
