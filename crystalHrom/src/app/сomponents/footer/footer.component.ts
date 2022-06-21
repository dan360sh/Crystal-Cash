import { Component, OnInit } from '@angular/core';
import {GetUserService} from "../service/get-user.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(readonly getUserService: GetUserService) { }

  get transaction (): boolean{
    if(this.getUserService.user?.transactionHistoryCount){
      if(this.getUserService.user.transactionHistoryCount > 0){
        return true;
      }
    }
    return false;
  }

  get message (): boolean{
    if(this.getUserService.user?.messageCount){
      if(this.getUserService.user.messageCount > 0){
        return true;
      }
    }
    return false;
  }
  transactionHistory(){
    this.getUserService.formFlag = "transaction-history";
    this.getUserService.backFlag = true;
  }
}
