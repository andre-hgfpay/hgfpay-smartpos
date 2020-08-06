import {ProductsEntity} from "./products.entity";
import {ProductCategoryEntity} from "./product-category.entity";

export const productsProviders = [
    {
        provide: 'ProductsRepository',
        useValue: ProductsEntity
    }
];

export const productsCategoryProviders = [
    {
        provide: 'ProductsCategoryRepository',
        useValue: ProductCategoryEntity
    }
];