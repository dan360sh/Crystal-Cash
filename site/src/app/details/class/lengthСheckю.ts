import {ErrorDto} from "../model/UserDto";


export interface ErrorStringLength{
  value?: string;
  lengthMin?: number;
  lengthMax?: number;
  name?: string;
  nameUser?: string;
}
export function lengthCheck(stringLength: ErrorStringLength[]): ErrorDto[]{
  const errors: ErrorDto[] = [];
  for(let el of stringLength){
    if(el.value && el.value?.length > 0){
      if(el.lengthMin) {
        if (el.value.length < el.lengthMin) {
          errors.push({
            message: `Длина поля '${el.nameUser}' должна быть не меньше ${el.lengthMin} символов.`,
            errorField: el.name
          })
        }
      }
      if(el.lengthMax){
        if(el.value.length > el.lengthMax){
          errors.push({
            message: `Длина поля '${el.nameUser}' не должна превышать ${el.lengthMax} символов.`,
            errorField: el.name
          })
        }
      }
    }else{
      errors.push({
        message: `Поле '${el.nameUser}' недолжно быть пустым.`,
        errorField: el.name
      })
    }

  }
  return errors;
}
