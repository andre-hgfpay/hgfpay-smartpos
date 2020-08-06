import {HttpService, Inject, Injectable} from '@nestjs/common';
import {ServiceEntity} from "./service.entity";
import {Http} from "../config/httpException";
import {CheckDocument} from "../config/checkDocument";
import {ClearService, ServiceRequestDto, ServiceRespDto} from "./dto/service.dto";
import {Op} from "sequelize";
import {retorne} from "../attendants/dto/attendants.dto";

@Injectable()
export class ServiceService {

    constructor(
        @Inject('ServiceRepository')
        private serviceRepository: typeof ServiceEntity,
        private httpService: HttpService) {
    }

    async index(gas_cnpj: string) {
        if (gas_cnpj == undefined) {
            Http.notFound('Posto não encontrado')
        }
        const req_externa = await this.reqApi(gas_cnpj);
        const rex = await this.serviceRepository.findAll<ServiceEntity>({
            where: {resp: null}
        })
        const req_interna = await rex.map(service => new ServiceRequestDto(service))
        if (req_externa != null) {
            return new retorne('', req_externa.concat(req_interna).sort());
        }
        if(req_interna.length ==0){
            Http.notFound("")
        }
        return new retorne('', req_interna);
    }

    async reqApi(cnpj: string) {
        try {
            const token = await this.token();
            const request = await this.httpService.get(process.env.URL_API + 'service/req/' + CheckDocument.removeMask(cnpj), {
                headers: {
                    Authorization: 'Bearer ' + token.authorization
                }
            }).toPromise()
            return request.data.data;
        } catch (e) {
            return null
        }
    }

    async clear(clearService: ClearService) {
        const token = await this.token();
        await this.serviceRepository.update<ServiceEntity>({resp: 'SEM USABILIDADE'}, {
            where: {resp: null}
        });
        await this.httpService.post(process.env.URL_API + 'service/clear', {cnpj: CheckDocument.removeMask(clearService.cnpj)}, {
            headers: {
                Authorization: 'Bearer ' + token.authorization
            }
        }).toPromise()
        return new retorne('req Limpas', [])
    }

    async respApi(request_id: number, resp: object) {
        try {
            const token = await this.token();
            const request = await this.httpService.put(process.env.URL_API + 'service/resp/' + request_id, {resp: resp}, {
                headers: {
                    Authorization: 'Bearer ' + token.authorization
                }
            }).toPromise()
            return request.data;
        } catch (e) {
            return null
        }
    }

    async create(method: string, req: string) {
        try {
            let reqx = new ServiceEntity();
            reqx.method = method;
            reqx.req = req;
            return reqx.save();
        } catch (e) {
            return null;
        }
    }

    async findRespNull(request_id: number) {
        return this.serviceRepository.findOne<ServiceEntity>({
            where: {
                resp: {[Op.ne]: null}, id: request_id
            }
        })
    }

    async resp(serviceRespDto: ServiceRespDto, request_id: number) {
        const resp = await this.serviceRepository.findOne<ServiceEntity>({where: {id: request_id}});
        if (!resp) {
            return this.respApi(request_id, serviceRespDto.resp)
        } else {
            resp.resp = JSON.stringify(serviceRespDto.resp);
            return resp.save()
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

    async pos(token: any) {
        const pos = await this.httpService.get(process.env.URL_API + 'pos/index?gas_station_id=' + token.gas_stations[0].id, {
            headers: {
                Authorization: 'Bearer ' + token.authorization
            }
        }).toPromise()
        return pos.data.data
    }

}
