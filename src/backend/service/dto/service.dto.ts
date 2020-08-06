import {ApiProperty} from "@nestjs/swagger";
import {ServiceEntity} from "../service.entity";

export class ServiceRequestDto {
    @ApiProperty()
    readonly request_id: number

    @ApiProperty()
    readonly req: string

    @ApiProperty()
    readonly optional: string

    @ApiProperty()
    readonly date_added: Date

    constructor(service: ServiceEntity) {
        this.request_id = service.id;
        this.req = service.req;
        this.optional = null;
        this.date_added = service.created_at;
    }
}

export class ServiceRespDto {
    @ApiProperty()
    readonly resp: object
}

export class ClearService{
    @ApiProperty()
    readonly cnpj: string
}