import {Routes} from "@angular/router";
import {FillingAdsComponent} from "./advertisement/filling-ads.component";
import {HomeComponent} from "../home/home.component";
import {UrlFillingComponent} from "./url-filling/url-filling.component";

//   {path: 'advertisement', component: AdvertisementComponent}
export const adminRouting   = [
  {path: 'fillingAds', component: FillingAdsComponent },
  {path: 'urlFilling', component: UrlFillingComponent }
];
