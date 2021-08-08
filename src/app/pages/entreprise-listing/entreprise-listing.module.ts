import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntrepriseListingPageRoutingModule } from './entreprise-listing-routing.module';

import { EntrepriseListingPage } from './entreprise-listing.page';
import {LimitToPipe} from '../../pipe/limit-to';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntrepriseListingPageRoutingModule
  ],
  declarations: [EntrepriseListingPage,
      LimitToPipe]
})
export class EntrepriseListingPageModule {}
