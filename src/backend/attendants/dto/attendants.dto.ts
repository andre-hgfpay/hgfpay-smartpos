import {ApiProperty} from "@nestjs/swagger";
import {AttendantsEntity} from "../attendants.entity";

export class AttendantsDto {

    @ApiProperty()
    readonly attendant_id: number

    @ApiProperty()
    readonly gas_station_id: number

    @ApiProperty()
    readonly gas_station_social_reason: string

    @ApiProperty()
    readonly gas_station_fantasy_name: string

    @ApiProperty()
    readonly nfc_id: number

    @ApiProperty()
    readonly external_id: string

    @ApiProperty()
    readonly cpf: string

    @ApiProperty()
    readonly cpf_formated: string

    @ApiProperty()
    readonly name: string

    @ApiProperty()
    readonly cellphone: string

    @ApiProperty()
    readonly email: string

    @ApiProperty()
    readonly password: string

    @ApiProperty()
    readonly cash_in_hands: number

    @ApiProperty()
    readonly rating: number

    @ApiProperty()
    readonly premmia: number


    constructor(attendant:AttendantsEntity) {
        this.attendant_id = attendant.attendant_id;
        this.gas_station_id = attendant.gas_station_id;
        this.gas_station_social_reason = attendant.gas_station_social_reason;
        this.gas_station_fantasy_name = attendant.gas_station_fantasy_name;
        this.nfc_id = attendant.nfc_id;
        this.external_id = attendant.external_id;
        this.cpf = attendant.cpf;
        this.cpf_formated = attendant.cpf;
        this.name = attendant.name;
        this.cellphone = attendant.cellphone;
        this.email = attendant.email;
        this.password = attendant.password;
        this.cash_in_hands = attendant.cash_in_hands;
        this.rating = attendant.rating;
        this.premmia = attendant.premmia;
    }
    
}

export class retorne {

    success:boolean
    message:string
    data:any


    constructor(message: string, data: any) {
        this.success = true;
        this.message = message;
        this.data = data;
    }
}

export class CreateAttendantsDto {

    @ApiProperty()
    readonly attendant_id: number

    @ApiProperty()
    readonly gas_station_id: number

    @ApiProperty()
    readonly gas_station_social_reason: string

    @ApiProperty()
    readonly gas_station_fantasy_name: string

    @ApiProperty()
    readonly nfc_id: number

    @ApiProperty()
    readonly external_id: string

    @ApiProperty()
    readonly cpf: string

    @ApiProperty()
    readonly cpf_formated: string

    @ApiProperty()
    readonly name: string

    @ApiProperty()
    readonly cellphone: string

    @ApiProperty()
    readonly email: string

    @ApiProperty()
    readonly password: string

    @ApiProperty()
    readonly cash_in_hands: number

    @ApiProperty()
    readonly rating: number

    @ApiProperty()
    readonly premmia: number


    constructor(attendant:any) {
        this.attendant_id = attendant.attendant_id;
        this.gas_station_id = attendant.gas_station_id;
        this.gas_station_social_reason = attendant.gas_station_social_reason;
        this.gas_station_fantasy_name = attendant.gas_station_fantasy_name;
        this.nfc_id = attendant.nfc_id;
        this.external_id = attendant.external_id;
        this.cpf = attendant.cpf;
        this.cpf_formated = attendant.cpf;
        this.name = attendant.name;
        this.cellphone = attendant.cellphone;
        this.email = attendant.email;
        this.password = attendant.password;
        this.cash_in_hands = attendant.cash_in_hands;
        this.rating = attendant.rating;
        this.premmia = attendant.premmia;
    }
    
}