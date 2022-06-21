import {ErrorDto} from "../model/UserDto";
import {InputModel} from "../model/InputModel";

export class ErrorParser{
  private errorList: ErrorDto[] = [];
  public errorFlag = false;
  //private inputModels?: InputModel[] = [];
  constructor( readonly inputModels: InputModel[]) {
  }

  event(el?: InputModel){
    if(el) {
        console.log('el', el)
        if(el.minLength){
          console.log('min')
          if (el.value.length < el.minLength) {
            this.errorList.push({
              message: `Длина поля '${el.name}' должна быть не меньше ${el.minLength} символов.`,
              errorField: el.name
            })
          }
        }
        if(el.maxLength){
          if(el.value.length > el.maxLength){
            this.errorList.push({
              message: `Длина поля '${el.name}' не должна превышать ${el.maxLength} символов.`,
              errorField: el.name
            })
          }
        }
      console.log('event', this.errorList)
    }
  }
  addError(errMass: ErrorDto[]) {
    this.errorList.push(...errMass);
    this.parse();
  }

  clearError(name?: InputModel, messge?: string) {
    this.errorList = this.errorList.filter(e => e.errorField !== name?.name);
    this.event(name);
    console.log('cliar', this.errorList);
    this.parse();
  }
  private parse(){
    console.log('parse', this.inputModels);
    this.errorFlag = false;
    this.inputModels?.map(e => {e.error.message = []; e.error.flag = false});
   // console.log('this.inputModels', this.inputModels);
    if(this.inputModels) {
      for (let name of this.inputModels) {
        let error = this.errorList.find(e => e.errorField === name.name);
        if (error?.message) {
          name.error.message.push(error.message);
          name.error.flag = true;
          this.errorFlag = true;
        }
      }
    }
    console.log('errorList', this.errorList);
    console.log('this.errList', this.inputModels);
  }
}
