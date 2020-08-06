import {CartsEntity} from "./carts.entity";

export const cartsProviders = [
    {
        provide: 'CartsRepository',
        useValue: CartsEntity
    }
];