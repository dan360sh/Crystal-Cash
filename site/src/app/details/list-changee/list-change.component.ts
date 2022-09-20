import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dropdowns} from "../model/InputModel";

@Component({
  selector: 'app-list-changee',
  templateUrl: './list-change.component.html',
  styleUrls: ['./list-change.component.css']
})
export class ListChangeComponent implements OnInit {
  @Input()
  lists: Dropdowns[] = [];
  @Output()
  deleteChange = new EventEmitter<Dropdowns>();
  @Output()
  editChange = new EventEmitter<Dropdowns>();

  constructor() { }

  ngOnInit(): void {
  }
  edit(e:Dropdowns){
    this.editChange.emit(e);
  }
  delete(e:Dropdowns){
    this.deleteChange.emit(e);
  }
}
