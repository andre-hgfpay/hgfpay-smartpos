import {ApiProperty} from "@nestjs/swagger";

export class OrdersDto {
    @ApiProperty()
    readonly pos_id: string;

    @ApiProperty()
    readonly cpf: string;

    @ApiProperty()
    readonly vehicle_id: string;

    @ApiProperty()
    readonly attendant_id: string;
}