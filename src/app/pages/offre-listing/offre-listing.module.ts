import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OffreListingPageRoutingModule } from './offre-listing-routing.module';

import { OffreListingPage } from './offre-listing.page';
import {LimitToPipe} from '../../pipe/limit-to';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OffreListingPageRoutingModule
  ],
  declarations: [OffreListingPage,
      LimitToPipe]
})
export class OffreListingPageModule {}
