import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarquesListingPageRoutingModule } from './marques-listing-routing.module';

import { MarquesListingPage } from './marques-listing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarquesListingPageRoutingModule
  ],
  declarations: [MarquesListingPage]
})
export class MarquesListingPageModule {}
