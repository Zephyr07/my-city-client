import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AbonnementPageRoutingModule } from './abonnement-routing.module';

import { AbonnementPage } from './abonnement.page';
import {PriceFormatPipe} from "../../pipe/price-format";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AbonnementPageRoutingModule
  ],
  declarations: [AbonnementPage, PriceFormatPipe]
})
export class AbonnementPageModule {}
