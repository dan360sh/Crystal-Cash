import { Component, OnInit } from '@angular/core';
import {InputModel} from "../model/InputModel";
import {ErrorParser} from "../class/errorParser";
import {HttpService} from "../http.service";
import {GetUserService} from "../service/get-user.service";
import {ErrorDto, GetUsers} from "../model/UserDto";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent  {
  authorizationModel: InputModel[] = [{
    value: '',
    name: 'name',
    error: {
      flag: false,
      message: []
    },
    placeholder: 'Введите логин',
    label: 'Логин'
  },
    {
      value: '',
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

  readonly comeErrorParse = new ErrorParser(this.authorizationModel);

  passwordFlag = false;
  constructor(private readonly httpService: HttpService,
              readonly getUserService: GetUserService
  ) { }
  load = false;

  authorizationUser(){
    this.load = true;
    this.httpService.form(this.authorizationModel, '/users/auth').subscribe(result => {
      this.load = false;
      if((result as any).name){
        this.getUserService.loginUser(result as GetUsers);
        this.getUserService.formFlag = "home";
        this.getUserService.backFlag = false;
      }
      if((result as any)[0]?.message){
        this.comeErrorParse.addError(result as ErrorDto[])
      }
    })
  }

  openNewPassword(){
    this.getUserService.formFlag = "home";
  }

}
