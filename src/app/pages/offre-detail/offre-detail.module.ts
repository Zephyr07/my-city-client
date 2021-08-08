import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OffreDetailPageRoutingModule } from './offre-detail-routing.module';

import { OffreDetailPage } from './offre-detail.page';
import {PriceFormatPipe} from "../../pipe/price-format";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OffreDetailPageRoutingModule
  ],
  declarations: [OffreDetailPage, PriceFormatPipe]
})
export class OffreDetailPageModule {}
