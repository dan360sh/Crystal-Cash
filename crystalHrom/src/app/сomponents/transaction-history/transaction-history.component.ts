import {Component, OnInit} from '@angular/core';
import {dateParse, HttpService} from "../http.service";
import {GetUserService} from "../service/get-user.service";

export interface messageInterface{
  message: string;
  date: string;
  countCrystal: number ;
}
export interface messageToParse{
  message: string;
  date: number;
  countCrystal: number ;
}
@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {

  constructor(private readonly httpService: HttpService, private readonly getUserService: GetUserService) {}
  messages: any[] = [];
  messageParse: messageInterface[] = [];
  load = false;

  ngOnInit(): void {
    this.load = true;
    if(this.getUserService.user?.transactionHistoryCount){
      this.getUserService.user.transactionHistoryCount = 0;
    }

    this.httpService.transactionHistor().subscribe(data => {
      this.messageParse = data.map(e => {return { ...e, date: dateParse(e.date)}})
      this.load = false;
    });
  }
}

