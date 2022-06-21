import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpService} from "../http.service";
import {ErrorDto, GetUsers} from "../model/UserDto";
import {InputModel} from "../model/InputModel";
import {GetUserService} from "../service/get-user.service";
import {ErrorParser} from "../class/errorParser";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  inputModel: InputModel[] = [{
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

  readonly codeField: InputModel = {
    value: '',
    name: 'cod',
    error: {
      flag: false,
      message: []
    },
    placeholder: 'Введите код',
    label: 'Код'
  }
  get button (): string{
    return this.load ? 'Загрузка' : 'Продолжить';
  }
  readonly comeErrorParse = new ErrorParser(this.inputModel);
  readonly authorizationErrorPars = new ErrorParser(this.authorizationModel);
  users = this.inputModel;
  step = false;
  passwordFlag = false;
  constructor(public activeModal: NgbActiveModal,
              private readonly httpService: HttpService,
              readonly getUserService: GetUserService
  ) { }
  load = false;
  ngOnInit(): void {
  }
  regUser(){
    this.load = true;
    this.httpService.form(this.users, '/users').subscribe(result => {
      this.load = false;
      if((result as any).name){
        this.getUserService.loginUser(result as GetUsers);
        this.step = true;
      }
      if((result as any)[0]?.message){
        this.comeErrorParse.addError(result as ErrorDto[])
      }
    })
  }

  authorization(){
    this.httpService.form(this.authorizationModel, '/users/auth').subscribe(result => {
      if((result as any).name){
        this.getUserService.loginUser(result as GetUsers);
        this.activeModal.dismiss('Cross click');
      }
      if((result as any)[0]?.message){
        this.authorizationErrorPars.addError(result as ErrorDto[])
      }
    });
  }

  cod(){
    this.httpService.form( [this.codeField], '/users/mailConfirm').subscribe(result => {
      if((result as any).name){
        this.getUserService.loginUser(result as GetUsers);
        this.activeModal.dismiss('Cross click');
      }
      if((result as any)[0]?.message){
        this.comeErrorParse.addError(result as ErrorDto[])
      }
    })
  }

  ff(){

  }
}
