import { Injectable } from '@angular/core';
import {GetUsers} from "../model/UserDto";
import {MemoryService} from "../../services/memoryService";

@Injectable({
  providedIn: 'root'
})
export class GetUserService {
  constructor(private readonly memory: MemoryService) {
    // this._backFlag = await memory.getValue('backFlag') == "true";
    // this._formFlag = (window as any).localStorage.getItem('formFlag') ?? "home";
    // console.log('init', this._backFlag);
    this.getValue();
  }
  async getValue(){
    this._backFlag = (await this.memory.getValue('backFlag')) == "true";
    this._formFlag = (await this.memory.getValue('formFlag')) ?? "home";
  }
  user?: GetUsers;
  private _backFlag: boolean = false;
  set backFlag (val : boolean){
    this._backFlag = val;
    this.memory.save('backFlag', val);
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
    this.memory.save('formFlag', val);
  }

  errorFlag = false;
  errorCode = 1;

  loginUser(user: GetUsers){
    this.memory.save('token', user.token);
    this.user = user;
  }
}
