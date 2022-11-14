import {Component, Input, OnInit} from '@angular/core';
import {Dropdowns, InputModel} from "../model/InputModel";
import {ErrorParsService} from "../service/error-pars.service";
import {ErrorParser} from "../class/errorParser";

@Component({
  selector: 'app-butstrap-input',
  templateUrl: './butstrap-input.component.html',
  styleUrls: ['./butstrap-input.component.css']
})
export class ButstrapInputComponent implements OnInit {
  @Input()
  inputModel!: InputModel;
  @Input()
  errorContext?: ErrorParser;
  constructor() { }
  name = Math.random().toString(36).substring(9);
 // selectArray: Dropdowns[] = []
  get typeInput(): boolean{
    if(this.inputModel.type){
      return (this.inputModel.type === 'input');
    }
    return true;
  }

  get typeTextarea(): boolean{
    if(this.inputModel.type){
      return (this.inputModel.type === 'textarea');
    }
    return false;
  }
  get typeDropdowns(): boolean{
    if(this.inputModel.type){
      return (this.inputModel.type === 'dropdowns');
    }
    return false;
  }
  get typeMultiSelect(): boolean{
    if(this.inputModel.type){
      return (this.inputModel.type === 'multiSelect');
    }
    return false;
  }
  dropdowns(value: any){
    this.inputModel.value = value;
  }
  select(value: Dropdowns){
    if(this.inputModel.value === undefined || this.inputModel.value == ''){
      this.inputModel.value = [];
    }
    this.inputModel.dropdowns?.splice( this.inputModel.dropdowns?.indexOf(value),1);
    this.inputModel.value.push(value);
  }
  delete(select: Dropdowns){
    this.inputModel.value?.splice( this.inputModel.value?.indexOf(select),1);
    this.inputModel.dropdowns?.push(select);
  }

  ngOnInit(): void {
  }
  change(){
    console.log('change');
    this.errorContext?.clearError(this.inputModel);
    console.log('change', this.inputModel);
  }
}
