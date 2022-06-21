import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpService} from "../http.service";
import {GetUserService} from "../service/get-user.service";
import {ErrorDto, GetUsers} from "../model/UserDto";
import {InputModel} from "../model/InputModel";
import {ErrorParser} from "../class/errorParser";

@Component({
  selector: 'app-reg-user',
  templateUrl: './reg-user.component.html',
  styleUrls: ['./reg-user.component.css']
})
export class RegUserComponent {

  userModel: InputModel[] = [{
    value: '',
    name: 'name',
    minLength: 3,
    maxLength: 20,
    error: {
      flag: false,
      message: []
    },
    placeholder: 'Придумайте логин',
    label: 'Логин'
  },
    {
      value: '',
      name: 'email',
      minLength: 4,
      maxLength: 40,
      error: {
        flag: false,
        message: []
      },
      placeholder: 'Введите почту',
      label: 'Почта'
    },
    {
      value: '',
      minLength: 6,
      maxLength: 30,
      name: 'password',
      error: {
        flag: false,
        message: []
      },
      placeholder: 'Введите пароль',
      label: 'Пароль'
    }
  ];

  get button (): string{
    return this.load ? 'Загрузка' : 'Продолжить';
  }
  readonly comeErrorParse = new ErrorParser(this.userModel);
  step = false;
  passwordFlag = false;
  constructor(private readonly httpService: HttpService,
              readonly getUserService: GetUserService
  ) { }
  load = false;

  regUser(){
    this.load = true;
    this.httpService.form(this.userModel, '/users').subscribe(result => {
      this.load = false;
      console.log(result)
      if((result as any).name){
        this.getUserService.loginUser(result as GetUsers);
        this.getUserService.formFlag = "mail-confirmation";
      }
      if((result as any)[0]?.message){
        this.comeErrorParse.addError(result as ErrorDto[])
      }
    })
  }
}
