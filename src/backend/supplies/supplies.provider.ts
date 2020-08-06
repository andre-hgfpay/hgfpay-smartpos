import {SuppliesEntity} from "./supplies.entity";

export const suppliesProviders = [
    {
        provide: 'SuppliesRepository',
        useValue: SuppliesEntity
    }
];