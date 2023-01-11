import { Component } from '@angular/core';
import {GetUserService} from "./сomponents/service/get-user.service";
import {GetUsers} from "./сomponents/model/UserDto";
import {HttpService} from "./сomponents/http.service";
import {MemoryService} from "./services/memoryService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crystalChrome';
  load = false;
  tabFlag?: string;

  constructor(readonly getUserService: GetUserService,
              private readonly httpService: HttpService,
              private readonly memory: MemoryService) {
    this.start();

  }
  async start(){
    this.tabFlag = (await this.memory.getValue('tabFlag')) ?? "auth";
    this.httpService.getUse().subscribe(result => {
      this.load = false;
      if((result as any).name){
        this.getUserService.loginUser(result as GetUsers);
      } else {
        this.memory.remove('token');

      }
    })
  }
  tab(val: string){
    this.memory.save('tabFlag', val);
  }
}
