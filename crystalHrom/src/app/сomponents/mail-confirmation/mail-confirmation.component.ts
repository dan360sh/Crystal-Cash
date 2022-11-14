import { Component, OnInit } from '@angular/core';
import {InputModel} from "../model/InputModel";
import {ErrorParser} from "../class/errorParser";
import {HttpService, MailСonfirmDto} from "../http.service";
import {GetUserService} from "../service/get-user.service";
import {ErrorDto, GetUsers} from "../model/UserDto";

@Component({
  selector: 'app-mail-confirmation',
  templateUrl: './mail-confirmation.component.html',
  styleUrls: ['./mail-confirmation.component.css']
})
export class MailConfirmationComponent {

  mailConfirmationModel: InputModel = {
    value: '',
    name: 'cod',
    error: {
      flag: false,
      message: []
    },
    placeholder: 'Введите код',
    label: 'Код подтверждения'
  };

  get button (): string{
    return this.load ? 'Загрузка' : 'Подтвердить';
  }
  readonly comeErrorParse = new ErrorParser([this.mailConfirmationModel]);

  passwordFlag = false;
  constructor(private readonly httpService: HttpService,
              readonly getUserService: GetUserService
  ) { }
  load = false;

  mailConfirmation(){
    this.load = true;
    let mailСonfirmDto: MailСonfirmDto = {
      email: this.getUserService.user?.email ? this.getUserService.user.email : " ",
      cod: this.mailConfirmationModel.value
    }
    this.httpService.mailConfirmation(mailСonfirmDto).subscribe(result => {
      this.load = false;
      if((result as any).name){
        this.getUserService.loginUser(result as GetUsers);
        this.getUserService.backFlag = false;
        this.getUserService.formFlag = "home";
      }
      if((result as any)[0]?.message){
        this.comeErrorParse.addError(result as ErrorDto[])
      }
    })
  }
  changeEmail(){
    
  }

}
