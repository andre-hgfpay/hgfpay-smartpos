import {AttendantsEntity} from "./attendants.entity";

export const attendantsProviders = [
    {
        provide: 'AttendantsRepository',
        useValue: AttendantsEntity
    }
];