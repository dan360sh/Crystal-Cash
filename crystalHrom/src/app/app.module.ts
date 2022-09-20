import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegUserComponent } from './сomponents/reg-user/reg-user.component';
import {ButstrapInputComponent} from "./сomponents/butstrap-input/butstrap-input.component";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { CrystalComponent } from './сomponents/crystal/crystal.component';
import { HeaderComponent } from './сomponents/header/header.component';
import { FooterComponent } from './сomponents/footer/footer.component';
import { AuthorizationComponent } from './сomponents/authorization/authorization.component';
import { MailConfirmationComponent } from './сomponents/mail-confirmation/mail-confirmation.component';
import { TransactionHistoryComponent } from './сomponents/transaction-history/transaction-history.component';
//import { NewPasswordComponent } from './сomponents/new-password/new-password.component';

@NgModule({
  declarations: [
    AppComponent,
    RegUserComponent,
    ButstrapInputComponent,
    CrystalComponent,
    HeaderComponent,
    FooterComponent,
    AuthorizationComponent,
    MailConfirmationComponent,
    TransactionHistoryComponent,
    //NewPasswordComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
