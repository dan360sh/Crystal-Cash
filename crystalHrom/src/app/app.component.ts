import { Component } from '@angular/core';
import {GetUserService} from "./сomponents/service/get-user.service";
import {GetUsers} from "./сomponents/model/UserDto";
import {HttpService} from "./сomponents/http.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crystalChrome';
  load = false;
  tabFlag?: string;

  constructor(readonly getUserService: GetUserService, private readonly httpService: HttpService) {
    this.tabFlag = (window as any).localStorage.getItem('tabFlag') ?? "auth";
    this.httpService.getUse().subscribe(result => {
      this.load = false;
      if((result as any).name){
        this.getUserService.loginUser(result as GetUsers);
      } else {
        try {
          (window as any).chrome.storage.local.remove('token');
          console.log('удалено');
        }catch (e){
          console.log(e);
        }
      }
    })
  }
  tab(val: string){
    (window as any).localStorage.setItem('tabFlag', val);
    console.log(val);
  }
}
