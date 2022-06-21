import {Component, OnInit} from '@angular/core';
import {HttpService} from "./details/http.service";
import {GetUserService} from "./details/service/get-user.service";
import {ErrorDto, GetUsers} from "./details/model/UserDto";
import {ErrorParsService} from "./details/service/error-pars.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'front-crystal';
  token = JSON.stringify({"token": "234536546"});
  ngOnInit(): void {
    this.httpService.getUse().subscribe(result => {
      if((result as any).name){
        this.getUserService.loginUser(result as GetUsers);
      }
      if((result as any)[0]?.message){
        this.errorParsService.addError(result as ErrorDto[])
      }
    })
  }
  constructor(readonly httpService: HttpService, readonly getUserService: GetUserService,readonly errorParsService: ErrorParsService) {

  }

}
