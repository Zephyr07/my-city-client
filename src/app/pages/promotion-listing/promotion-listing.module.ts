import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PromotionListingPageRoutingModule } from './promotion-listing-routing.module';

import { PromotionListingPage } from './promotion-listing.page';
import {DateFormatPipe} from "../../pipe/date-format";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PromotionListingPageRoutingModule
  ],
  declarations: [PromotionListingPage, DateFormatPipe]
})
export class PromotionListingPageModule {}
