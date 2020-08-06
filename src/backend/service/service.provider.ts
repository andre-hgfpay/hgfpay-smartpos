import {ServiceEntity} from "./service.entity";

export const serviceProviders = [
    {
        provide: 'ServiceRepository',
        useValue: ServiceEntity
    }
];