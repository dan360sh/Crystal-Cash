import {Injectable} from '@angular/core';
import {ErrorDto} from "../model/UserDto";
import {InputModel} from "../model/InputModel";

@Injectable({
  providedIn: 'root'
})
export class ErrorParsService {
  private errorList: ErrorDto[] = [];
  private inputModels?: InputModel[] = [];


  addError(errMass: ErrorDto[], inputModel?: InputModel[]) {
    this.inputModels = inputModel;
    this.errorList.push(...errMass);
    this.parse();
  }

  clearError(name?: string, messge?: string) {
    this.errorList = this.errorList.filter(e => e.errorField !== name);
    console.log('cliar', this.errorList);
    this.parse();
  }
  private parse(){
    this.inputModels?.map(e => {e.error.message = []; e.error.flag = false});
    console.log('this.inputModels', this.inputModels);
    if(this.inputModels) {
      for (let name of this.inputModels) {
        let error = this.errorList.find(e => e.errorField === name.name);
        if (error?.message) {
          name.error.message.push(error.message);
          name.error.flag = true;
        }
      }
    }
    console.log('errorList', this.errorList);
    console.log('this.errList', this.inputModels);
  }
}
