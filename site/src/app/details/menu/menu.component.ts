import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DialogComponent} from "../dialog/dialog.component";
import {GetUserService} from "../service/get-user.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private modalService: NgbModal,
              readonly getUserService: GetUserService) {}
  open() {
    const modalRef = this.modalService.open(DialogComponent,{ size: 'lg' });
  }

  ngOnInit(): void {
  }
  menu = false;
  clickButton(){
    this.menu = !this.menu;
  }
}
