import {Inject, Injectable} from '@nestjs/common';
import {SuppliesEntity} from "./supplies.entity";
import {ServiceService} from "../service/service.service";
import {retorne} from "../attendants/dto/attendants.dto";
import {CreateSuppliesDto, SuppliesDto} from "./dto/supplies.dto";
import {Http} from "../config/httpException";

@Injectable()
export class SuppliesService {

    constructor(
        @Inject('SuppliesRepository')
        private suppliesRepository: typeof SuppliesEntity,
        private serviceService: ServiceService) {
    }

    async index(filter: any, pos_id: string) {
        const token = await this.serviceService.token();
        const pos = await this.serviceService.pos(token)
        let serial: string = ''
        pos.map((pos: any) => {
            if (pos.id == pos_id) {
                serial = pos.serial_number
            }
        })
        await this.suppliesRepository.destroy({where: {pos_id}});
        let req: string = 'BB|G|0|' + token.gas_stations[0].cnpj + '|' + serial;
        if (filter.attendant_id) {
            req = 'BB|A|' + filter.attendant_id + '|' + token.gas_stations[0].cnpj + '|' + serial
        } else if (filter.pump_number) {
            req = 'BB|B|' + filter.pump_number + '|' + token.gas_stations[0].cnpj + '|' + serial
        }
        const request = await this.serviceService.create('BB', req)
        let x = 0;
        while (x <= 30) {
            const respx = await this.serviceService.findRespNull(request.id)
            if (respx != null) {
                if (respx.resp != null) {
                    let json = JSON.parse(respx.resp);
                    await json.map(async (supplie: any) => await this.suppliesRepository.create(new CreateSuppliesDto(Number(pos_id), supplie)));

                    await this.delay(300);
                    return new retorne('Abastecimento', await this.pos(Number(pos_id)));
                }
            }
            await this.delay(1000);
            x++;
        }

    }

    async create(createSuppliesDto: CreateSuppliesDto) {
        const supplie = await this.suppliesRepository.create(createSuppliesDto)
        return new SuppliesDto(supplie);
    }

    async pos(pos_id: number) {
        const supplies = await this.suppliesRepository.findAll<SuppliesEntity>({where: {pos_id}})
        if (supplies.length == 0) {
            Http.notFound('Abastec')
        }
        return supplies.map(su => new SuppliesDto(su));
    }

    async findById(supply_id: string) {
        return this.suppliesRepository.findOne<SuppliesEntity>({where: {supply_id}})
    }

    async findBySupplyKey(supply_key: string) {
        return this.suppliesRepository.findOne<SuppliesEntity>({where: {supply_key}})
    }

    async supplies(supplyKey:string){
        const supply = await this.findBySupplyKey(supplyKey);
        if(!supply){
            Http.notFound("Abastecimentos não encontrados!")
        }
        return new retorne( "Informações do status atual do abastecimento!",{
            "status_id": supply.status,
            "description": supply.status === 4 ? "Solicitação de Uso" : "Livre"
        })
    }

    async status(supplyKey: string, status: string) {
        const supply = await this.findBySupplyKey(supplyKey);
        if(!supply){
            Http.notFound("Abastecimentos não encontrados!")
        }
        const token = await this.serviceService.token();
        const pos = await this.serviceService.pos(token)
        let serial: string = ''
        pos.map((pos: any) => {
            if (pos.id == supply.pos_id) {
                serial = pos.serial_number
            }
        })
        if (supply.status != 4 || status != '5') {
            await this.serviceService.create('SA', 'SA|SK|' + supplyKey + '|' + token.gas_stations[0].cnpj + '|' + serial)
            supply.status = 4;
            supply.save();
            return new retorne('Status do abastecimento atualizado com sucesso!', []);
        } else { // @ts-ignore
            if (supply.status != 1 || status != '1') {
                await this.serviceService.create('ZP', 'ZP|' + serial + '|' + supplyKey)
                supply.status = 4;
                supply.save();
                return new retorne('Status do abastecimento atualizado com sucesso!', []);
            }
        }
        Http.notFound('abastecimento')
    }

    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


}
