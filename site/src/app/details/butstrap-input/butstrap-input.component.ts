import {Component, Input, OnInit} from '@angular/core';
import {InputModel} from "../model/InputModel";
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
  ngOnInit(): void {
  }
  change(){
    console.log('change');
    this.errorContext?.clearError(this.inputModel);
    console.log('change', this.inputModel);
  }
}
