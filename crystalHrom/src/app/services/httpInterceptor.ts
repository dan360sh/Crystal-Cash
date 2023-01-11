import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";

import { Injectable } from "@angular/core";
import {Observable} from "rxjs";
import {MemoryService} from "./memoryService";


@Injectable({
  providedIn: 'root'
})
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private readonly memory: MemoryService) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token =  this.memory.getValue('token');
    console.log('inspect', token);
    const authReq = req.clone({
      headers: req.headers.set('Authorization', token),
    })
    return next.handle(authReq);
  }

}
