import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from './details/dialog/dialog.component';
import { MenuComponent } from './details/menu/menu.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ButstrapInputComponent } from './details/butstrap-input/butstrap-input.component';
import { HomeComponent } from './details/home/home.component';
import { AdminComponent } from './details/admin/admin/admin.component';
import { FillingAdsComponent } from './details/admin/advertisement/filling-ads.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    MenuComponent,
    ButstrapInputComponent,
    HomeComponent,
    AdminComponent,
    FillingAdsComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
