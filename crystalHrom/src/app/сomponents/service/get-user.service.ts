import { Injectable } from '@angular/core';
import {GetUsers} from "../model/UserDto";

@Injectable({
  providedIn: 'root'
})
export class GetUserService {
  constructor() {
    this._backFlag = (window as any).localStorage.getItem('backFlag') == "true";
    this._formFlag = (window as any).localStorage.getItem('formFlag') ?? "home";
    console.log('init', this._backFlag);
  }
  user?: GetUsers;
  private _backFlag: boolean = false;
  set backFlag (val : boolean){
    this._backFlag = val;
    (window as any).localStorage.setItem('backFlag', val);
  };
  get backFlag (): boolean{
    return this._backFlag;
  }

  private _formFlag: string = "";
  get formFlag(): string{
    return this._formFlag;
  }
  set formFlag(val : string){
    this._formFlag = val;
    (window as any).localStorage.setItem('formFlag', val);
  }

  errorFlag = false;
  errorCode = 1;

  loginUser(user: GetUsers){
    this.user = user;
  }
}
