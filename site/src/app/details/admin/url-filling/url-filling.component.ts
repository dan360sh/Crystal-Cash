import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../http.service";
import {Dropdowns, InputModel} from "../../model/InputModel";
import {ErrorParser} from "../../class/errorParser";
import {ErrorDto, GetUsers} from "../../model/UserDto";
import {catchError} from "rxjs";
export interface Fillings{
  _id: string,
  name: string
}
@Component({
  selector: 'app-url-filling',
  templateUrl: './url-filling.component.html',
  styleUrls: ['./url-filling.component.css']
})
export class UrlFillingComponent implements OnInit {
  constructor(private readonly httpService: HttpService) { }
  id?:string;
  urlFillings: Dropdowns[] = [];
  fillings: Dropdowns[] = [];
  inputModel: InputModel[] = [
    {
      value: '',
      name: 'name',
      error: {
        flag: false,
        message: []
      },
      label: 'Название'
    },
    {
    value: '',
    name: 'url',
    error: {
      flag: false,
      message: []
    },
    label: 'Путь страницы'
  },
    {
      value: '',
      name: 'domen',
      error: {
        flag: false,
        message: []
      },
      label: 'Домен'
    },
    {
      value: '',
      name: 'search',
      error: {
        flag: false,
        message: []
      },
      label: 'Поиск'
    },
    {
      value: '',
      name: 'advertisement',
      error: {
        flag: false,
        message: []
      },
      dropdowns: this.fillings,
      type: 'multiSelect',
      label: 'Рекламы'
    },

  ];
  readonly comeErrorParse = new ErrorParser(this.inputModel);
  load = false;
  fillingAds(){
    this.httpService.form(this.inputModel, '/url-filling').subscribe(e => {
      console.log(e, 'eeeee');
      this.getUrlFillings();
    });
  }
  getUrlFillings(){
    this.httpService.get('/url-filling').subscribe(result =>{
      this.urlFillings = [];
      if((result as any)[0]?.message){
        this.comeErrorParse.addError(result as ErrorDto[])
      }
      let d: Fillings[] = []
      if((result as any)[0]?._id){
        d = (result as Fillings[]);
        for(let x of d){
          this.urlFillings.push({value: x, text: x.name})
        }
      }

    })
  }
  getFillings(){
    this.httpService.get('/filling-ads/getFillings').subscribe(result =>{
      if((result as any)[0]?.message){
        this.comeErrorParse.addError(result as ErrorDto[])
      }
      let d: Fillings[] = []
      if((result as any)[0]?._id){
        d = (result as Fillings[]);
        for(let x of d){
          this.fillings.push({value: x, text: x.name})
        }
      }

    })
  }
  deleteUrlFilling(e: Dropdowns){
    this.httpService.delete('/url-filling/' + e.value._id).subscribe(e => {
      this.getUrlFillings();
    })
  }

  delete(e: Dropdowns){
    this.deleteUrlFilling(e);
  }

  editUrlFilling(){
    console.log('/url-filling/');
    this.httpService.form(this.inputModel, '/url-filling/' + this.id, 'patch').subscribe(e => {
      this.getUrlFillings();
    })
  }

  edit(e: Dropdowns) {
    this.id = e.value._id;
    for (let el of this.inputModel) {
      if (el.type === 'dropdowns' || el.type === 'multiSelect') {
        console.log(e.value,'value')
        console.log(el.name,'el.name')
        console.log(el.dropdowns,'el.dropdowns')
        el.value = [];
        for(let advertisement of e.value.advertisement){
          el.value.push(el.dropdowns?.find(j => j.value._id == advertisement));
        }

        console.log(el.value,'el.value')
      } else {
        el.value = e.value[el.name];
      }
    }
  }

  ngOnInit(): void {
    this.getFillings();
    this.getUrlFillings();
  }

}
