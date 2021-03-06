import { Component } from '@angular/core';
import {GetUserService} from "../service/get-user.service";
import {HttpService} from "../http.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(readonly getUserService: GetUserService, private readonly httpService: HttpService) { }
  get button(): string{
    return this.getUserService.backFlag ? "Назад" : "Войти";
  }
  input(){
    this.getUserService.backFlag = true;
    this.getUserService.formFlag =  "reg";
  }
  back(){
    this.getUserService.backFlag = false;
    this.getUserService.formFlag =  "home";
  }
  drop(){
    this.getUserService.user = undefined;
    this.httpService.out();
  }
  clirAll(){
    try {
      (window as any).chrome.storage.local.remove('token');
      (window as any).chrome.storage.local.remove('noToken');
      console.log('удалено');
    }catch (e){
      console.log(e);
    }
  }
  close(){
    this.getUserService.errorFlag = false;
  }

  auth(){
    this.getUserService.errorFlag = false;
    this.getUserService.backFlag = true;
    this.getUserService.formFlag = "reg";
  }

  email(){
    this.getUserService.errorFlag = false;
    this.getUserService.backFlag = true;
    this.getUserService.formFlag = "mail-confirmation";
  }
}
