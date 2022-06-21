import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./details/home/home.component";

import {adminRouting} from "./details/admin/routing";
import {AdminComponent} from "./details/admin/admin/admin.component";

const routes: Routes = [
  { path: '', component: HomeComponent},
  {path: 'admin', component: AdminComponent, children: adminRouting}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
