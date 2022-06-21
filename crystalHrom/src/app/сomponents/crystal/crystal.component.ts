import { Component, OnInit } from '@angular/core';
import {GetUserService} from "../service/get-user.service";

@Component({
  selector: 'app-crystal',
  templateUrl: './crystal.component.html',
  styleUrls: ['./crystal.component.css']
})
export class CrystalComponent{
  constructor(readonly getUserService: GetUserService) {
  }
  onOff = "/assets/img/cristal_off.png";
  switchFlag = false;
  switch(){
    if(!this.getUserService.user){
      this.getUserService.errorFlag = true;
      this.getUserService.errorCode = 1;
      return;
    }

    if(this.getUserService.user?.status != 2){
      this.getUserService.errorFlag = true;
      this.getUserService.errorCode = 2;
      return;
    }
    this.switchFlag = !this.switchFlag;
    if(this.switchFlag){
      this.onOff = "/assets/img/cristal.png"
    }else{
      this.onOff = "/assets/img/cristal_off.png"
    }
  }

}
