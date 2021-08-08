import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OffrePrixPageRoutingModule } from './offre-prix-routing.module';

import { OffrePrixPage } from './offre-prix.page';
import {PriceFormatPipe} from "../../pipe/price-format";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OffrePrixPageRoutingModule
  ],
  declarations: [OffrePrixPage, PriceFormatPipe]
})
export class OffrePrixPageModule {}
