import {HttpService, Inject, Injectable} from '@nestjs/common';
import {ProductsEntity} from "./products.entity";
import {Http} from "../config/httpException";
import {retorne} from "../attendants/dto/attendants.dto";
import {CreateProductsDto, ProductsDto} from "./dto/products.dto";
import {Op} from "sequelize";
import {ServiceService} from "../service/service.service";
import {ProductCategoryEntity} from "./product-category.entity";
import {CreateProductCategoriesDto} from "../categories/dto/categories.dto";
import {CategoriesEntity} from "../categories/categories.entity";

@Injectable()
export class ProductsService {

    constructor(
        @Inject('ProductsRepository')
        private productsRepository: typeof ProductsEntity,
        @Inject('ProductsCategoryRepository')
        private productsCategoryRepository: typeof ProductCategoryEntity,
        private serviceService: ServiceService,
        private httpService: HttpService
    ) {
    }

    async index(filter: any) {
        let query = {}
        if (filter.category_id != undefined) {
            // @ts-ignore
            query = {include: [{model: CategoriesEntity, where: {id: filter.category_id}}]}
        }
        if (filter.product_info != undefined) {
            // @ts-ignore
            query = {
                include: [{model: CategoriesEntity}], where: {
                    description: {
                        [Op.like]: '%' + filter.product_info + '%',
                    }
                }
            }
        }
        console.log(query)
        const products = await this.productsRepository.findAll<ProductsEntity>(query)
        if (products.length == 0) {
            Http.notFound('produtos')
        }
        return new retorne('Produtos', products.map(value => new ProductsDto(value)))
    }

    async findById(id: number) {
        return this.productsRepository.findOne<ProductsEntity>({where: {id}})
    }

    async integration() {
        await this.productsRepository.destroy({
            where: {
                id: {
                    [Op.ne]: null
                }
            }
        });
        await this.productsCategoryRepository.destroy({
            where: {
                id: {
                    [Op.ne]: null
                }
            }
        });
        try {
            const token = await this.serviceService.token();
            const products = await this.httpService.get(process.env.URL_API + 'products/gasStations/' + token.gas_stations[0].id, {
                headers: {
                    Authorization: 'Bearer ' + token.authorization
                }
            }).toPromise()
            await products.data.data.map(async (data: any) => {
                await this.productsRepository.create(new CreateProductsDto(data));
                data.category_id.map(async (cat: any) => {
                    await this.productsCategoryRepository.create(new CreateProductCategoriesDto(cat, data.product_id))
                })
            });
            return {menssagem: 'integração completa'}
        } catch (e) {
            console.log(e)
            //return null
        }
    }

}
