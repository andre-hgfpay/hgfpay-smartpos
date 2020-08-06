import {HttpService, Inject, Injectable} from '@nestjs/common';
import {AttendantsEntity} from "./attendants.entity";
import {Http} from "../config/httpException";
import {AttendantsDto, CreateAttendantsDto, retorne} from "./dto/attendants.dto";
import {ServiceService} from "../service/service.service";
import {Op} from "sequelize";

@Injectable()
export class AttendantsService {

    constructor(
        @Inject('AttendantsRepository')
        private attendantsRepository: typeof AttendantsEntity,
        private serviceService: ServiceService,
        private httpService: HttpService) {
    }

    async index() {
        const attendants = await this.attendantsRepository.findAll<AttendantsEntity>()
        if (attendants.length == 0) {
            Http.notFound('Frentista')
        }
        return new retorne('Informações dos Atendentes', attendants.map(value => new AttendantsDto(value)))
    }

    async integration() {
        await this.attendantsRepository.destroy({where:{attendant_id:{
                    [Op.ne]: null
                }}});
        try {
            const token = await this.serviceService.token();
            const pos = await this.httpService.get(process.env.URL_API + 'pos/index?gas_station_id=' + token.gas_stations[0].id, {
                headers: {
                    Authorization: 'Bearer ' + token.authorization
                }
            }).toPromise()
            const attendants = await this.httpService.get(process.env.URL_API + 'attendants/pos/' + pos.data.data[0].id, {
                headers: {
                    Authorization: 'Bearer ' + token.authorization
                }
            }).toPromise()
            await attendants.data.data.map(async (data: any) => await this.attendantsRepository.create(new CreateAttendantsDto(data)));
            return {menssagem:'integração completa'}
        } catch (e) {
            console.log(e)
            //return null
        }

    }

}
