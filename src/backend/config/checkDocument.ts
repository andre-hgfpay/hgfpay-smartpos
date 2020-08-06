import { cnpj, cpf } from 'cpf-cnpj-validator';
import {Http} from "./httpException";

export class CheckDocument {
  static isValid(document :string){
    document = this.removeMask(document)
    let ret: boolean
    if (document.length === 14){
      ret = cnpj.isValid(document)
    }else{
      ret = cpf.isValid(document)
    }
    if(!ret){
      Http.badRequest()
    }
  }

  static removeMask(document :string){
    return document.replace(/[^\d]+/g,'');
  }
}