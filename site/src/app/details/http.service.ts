import { Injectable } from '@angular/core';
import {catchError, map, Observable, of, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CreateUserDto, ErrorDto, GetUsers} from "./model/UserDto";
import {InputModel} from "./model/InputModel";
const host = "http://localhost:3000"
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  form(inputs: InputModel[], path: string): Observable<GetUsers | ErrorDto[]>{
    let user: any = {};
    for (let i of inputs){
      user[i.name] = i.value;
    }
    return this.http.post<GetUsers>(host + path, user).pipe<ErrorDto[]>(catchError((err => {
      return [err.error];
    })))
  }
  getUse(){
    return this.http.get<GetUsers>(`${host}/users/getUser`).pipe<ErrorDto[]>(catchError((err => {
      return [err.error];
    })))
  }
}
