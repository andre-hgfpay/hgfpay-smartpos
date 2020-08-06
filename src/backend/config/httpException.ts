import { HttpException, HttpStatus } from '@nestjs/common';


export class Http {
  
  static forbiden(){
    throw new HttpException('Vocẽ não tem permissão para isso ☹️‍', HttpStatus.FORBIDDEN);
  }

  static UNAUTHORIZED(){
    throw new HttpException('Acesso Negado 😬️‍', HttpStatus.UNAUTHORIZED);
  }

  static notFound(type:string){
    throw new HttpException(
      'Não ha '+type+' cadastrado no sistema 😕',
      HttpStatus.NOT_FOUND,
    );
  }

  static notFoundCep(){
    throw new HttpException(
      'Não encontrei seu CEP 😕',
      HttpStatus.NOT_FOUND,
    );
  }

  static internalServerError(err:any){
    throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  static badRequest(){
    throw new HttpException(
      'Olooco meu. esse Doc e Falsoo!!! 🤥',
      HttpStatus.BAD_REQUEST,
    );
  }

  static badRequestAuth(){
    throw new HttpException(
      'As credenciais estão invalidas 🙆‍♀️🤥',
      HttpStatus.BAD_REQUEST,
    );
  }

  static conflict(){
    throw new HttpException(
      'Esse usuario ja esta cadastrado 🤙️‍',
      HttpStatus.CONFLICT,
    );
  }

  static addressInvalid(){
    throw new HttpException(
      'E preciso cadastrar um endereço para o fiel🤙️‍',
      HttpStatus.BAD_REQUEST,
    );
  }

}