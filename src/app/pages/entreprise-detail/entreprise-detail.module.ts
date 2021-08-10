import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntrepriseDetailPageRoutingModule } from './entreprise-detail-routing.module';

import { EntrepriseDetailPage } from './entreprise-detail.page';
import {LimitToPipe} from "../../pipe/limit-to";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntrepriseDetailPageRoutingModule
  ],
  declarations: [EntrepriseDetailPage, LimitToPipe]
})
export class EntrepriseDetailPageModule {}
