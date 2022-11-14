import { Component, OnInit } from '@angular/core';
import {Dropdowns, InputModel} from "../../model/InputModel";
import {ErrorParser} from "../../class/errorParser";
import {HttpService} from "../../http.service";
import {ErrorDto} from "../../model/UserDto";
import {Fillings} from "../url-filling/url-filling.component";

@Component({
  selector: 'app-filling-ads',
  templateUrl: './filling-ads.component.html',
  styleUrls: ['./filling-ads.component.css']
})
export class FillingAdsComponent implements OnInit {

  constructor(private readonly httpService: HttpService) { }
  id?: string;
  fillings: Dropdowns[] = [];
  inputModel: InputModel[] = [{
    value: '',
    name: 'name',
    minLength: 3,
    maxLength: 20,
    error: {
      flag: false,
      message: []
    },
    placeholder: 'Придумайте Название',
    label: 'Название'
  },
    {
      value: '',
      name: 'selector',
      error: {
        flag: false,
        message: []
      },
      label: 'селектор'
    },
    {
      value: '0',
      name: 'maxCount',
      error: {
        flag: false,
        message: []
      },
      label: 'Какой может максимально находиться по счету'
    },
    {
      value: '0',
      name: 'minCount',
      error: {
        flag: false,
        message: []
      },
      label: 'Какой может минимально находиться по счетуу'
    },
    {
      value: '5',
      name: 'priority',
      error: {
        flag: false,
        message: []
      },
      label: 'Приоритет'
    },
    {
      value: '',
      name: 'html',
      type: 'textarea',
      error: {
        flag: false,
        message: []
      },
      label: 'Верстка нового компонента'
    },
    {
      value: '',
      name: 'wherePlace',
      type: 'dropdowns',
      error: {
        flag: false,
        message: []
      },
      label: 'тип расположения',
      dropdowns: [
        {value: 'instead', text: 'Вместо'},
        {value: 'insideFront', text: 'Внутри до'},
        {value: 'insideAfter', text: 'Внутри после'},

        {value: 'after', text: 'После'},
        {value: 'before', text: 'До'},
        {value: 'remove', text: 'Удалить'}]
    },
    {
      value: {value: 'www', text: 'Реклама'},
      name: 'type',
      type: 'dropdowns',
      error: {
        flag: false,
        message: []
      },
      label: 'Тип',
      dropdowns: [{value: 'advertising', text: 'Реклама'}, {value: 'crystal', text: 'Кристал'}, ]
    }
  ];
  readonly comeErrorParse = new ErrorParser(this.inputModel);
  load = false;
  fillingAds(){
    console.log('submit')
    this.httpService.form(this.inputModel, '/filling-ads').subscribe(e => {
      console.log(e, 'eeeee');
    });
  }
  getFillings(){
    this.httpService.get('/filling-ads/getFillings').subscribe(result =>{
      this.fillings = [];
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
  ngOnInit(): void {
    this.getFillings();
  }
  delete(e: Dropdowns){
    console.log(e, 'delete');
    this.deleteFilling(e);
  }

  edit(e: Dropdowns) {
    this.id = e.value._id;
    for (let el of this.inputModel) {
      if (el.type === 'dropdowns') {
        el.value = el.dropdowns?.find(j => j.value == e.value[el.name]);
      } else {
        el.value = e.value[el.name];
      }
    }
  }
  editFilling(){
    this.httpService.form(this.inputModel, '/filling-ads/' + this.id, 'patch').subscribe(e => {
      this.getFillings();
    })
  }
  deleteFilling(e: Dropdowns){
    this.httpService.delete('/filling-ads/' + e.value._id).subscribe(e => {
      this.getFillings();
    })
  }

}
