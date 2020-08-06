import {HttpService, Inject, Injectable} from '@nestjs/common';
import {CategoriesEntity} from "./categories.entity";
import {Http} from "../config/httpException";
import {CategoriesDto, CreateCategoriesDto} from "./dto/categories.dto";
import {retorne} from "../attendants/dto/attendants.dto";
import {ServiceService} from "../service/service.service";
import {Op} from "sequelize";

@Injectable()
export class CategoriesService {

    constructor(
        @Inject('CategoriesRepository')
        private categoriesRespository: typeof CategoriesEntity,
        private serviceService: ServiceService,
        private httpService: HttpService
    ) {
    }

    async index(gasStation: number) {
        const categories = await this.categoriesRespository.findAll<CategoriesEntity>();
        if (categories.length == 0) {
            Http.notFound('Categorias')
        }
        return new retorne('Informações dos Atendentes', categories.map(value => new CategoriesDto(value, gasStation)))
    }

    async integration() {
        await this.categoriesRespository.destroy({where:{id:{
                    [Op.ne]: null
                }}});
        try {
            const token = await this.serviceService.token();
            const categories = await this.httpService.get(process.env.URL_API + 'categories/gasStation/'+token.gas_stations[0].id, {
                headers: {
                    Authorization: 'Bearer ' + token.authorization
                }
            }).toPromise()
            await categories.data.data.map(async (data: any) => await this.categoriesRespository.create(new CreateCategoriesDto(data)));
            return {menssagem:'integração completa'}
        } catch (e) {
            console.log(e)
            //return null
        }
    }

}
