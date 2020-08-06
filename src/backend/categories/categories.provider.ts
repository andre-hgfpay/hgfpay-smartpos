import {CategoriesEntity} from "./categories.entity";

export const categoriesProviders = [
    {
        provide: 'CategoriesRepository',
        useValue: CategoriesEntity
    }
];