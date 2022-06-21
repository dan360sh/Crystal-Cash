import { Injectable } from '@angular/core';
import {GetUsers} from "../model/UserDto";

@Injectable({
  providedIn: 'root'
})
export class GetUserService {
  user?: GetUsers;
  constructor() { }
  loginUser(user: GetUsers){
    this.user = user;
  }
}
