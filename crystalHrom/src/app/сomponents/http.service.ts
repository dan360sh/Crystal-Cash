import { Injectable } from '@angular/core';
import {catchError, map, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { ErrorDto, GetUsers} from "./model/UserDto";
import {InputModel} from "./model/InputModel";
import {messageInterface, messageToParse} from "./transaction-history/transaction-history.component";
const host = "http://localhost:3000"
function getCookie(name: string) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
export function dateParse(dateNumber: number): string{
  let date = new Date(dateNumber * 1000);
  return date.getDate()+ '.' + date.getHours() + '.' + date.getMinutes();
}
export interface MailСonfirmDto{
  email: string,
  cod: string
}
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
    return this.http.post<GetUsers>(host + path, user,{headers: {
        'Access-Control-Allow-Origin': '*'
      }})
      .pipe(tap(e => {
        if(e.token){
          try {
            (window as any).chrome.storage.local.set({
              'token': e.token,
            });
            console.log('запуск прода')
          }catch (e){
            console.log('запуск теста')
          }
          document.cookie = `lol=${e.token}`;
        }

      }))
      .pipe<ErrorDto[]>( catchError((err => {
      return [err.error];
    })))

  }
  getUse(){
    return this.http.get<GetUsers>(`${host}/users/getUser`,
      {headers: {
        'Access-Control-Allow-Origin': '*'
      }}).pipe<ErrorDto[]>(catchError((err => {
      return [err.error];
    })))
  }

  out(){
    return this.http.post<GetUsers>(`${host}/users/out`, null,{headers: {
        'Access-Control-Allow-Origin': '*'
      }})
      .pipe<ErrorDto[]>( catchError((err => {
        return [err.error];
      }))).subscribe();

  }
  mailConfirmation(body: MailСonfirmDto){
    return this.http.post<GetUsers>(`${host}/users/mailConfirm`, body,{headers: {
        'Access-Control-Allow-Origin': '*'
      }})
      .pipe<ErrorDto[]>( catchError((err => {
        return [err.error];
      })));
  }

  transactionHistor(): Observable<messageToParse[]>{
    return this.http.get<messageToParse[]>(`${host}/users/transaction-history`)

  }
}
