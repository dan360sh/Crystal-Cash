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
  form(inputs: InputModel[], path: string, type?: string): Observable<any | ErrorDto[]>{
    let user: any = {};
    for (let i of inputs){
      if(i.type == "dropdowns"){
        user[i.name] = i.value.value;
      }else{
        if(i.type ==  "multiSelect"){
          console.log("multiSelect", i.value)
          user[i.name] = [];
          for(let e of i.value){
            console.log("multiSelecteeee", e)
            user[i.name].push(e.value._id);
          }
        }else{
          user[i.name] = i.value;
        }
      }
    }
    if(type === "patch"){
      return this.http.patch<any>(host + path, user).pipe<ErrorDto[]>(catchError((err => {
        return [err.error];
      })))
    }
    return this.http.post<any>(host + path, user).pipe<ErrorDto[]>(catchError((err => {
      return [err.error];
    })))
  }
  getUse(){
    return this.http.get<GetUsers>(`${host}/users/getUser`).pipe<ErrorDto[]>(catchError((err => {
      return [err.error];
    })))
  }
  get(path: string){
    return this.http.get<any>(host + path).pipe<ErrorDto[]>(catchError((err => {
      return [err.error];
    })))
  }
  delete(path: string){
    return this.http.delete<any>(host + path).pipe<ErrorDto[]>(catchError((err => {
      return [err.error];
    })))
  }
}
