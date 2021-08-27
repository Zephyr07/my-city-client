import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriesListingPageRoutingModule } from './categories-listing-routing.module';

import { CategoriesListingPage } from './categories-listing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriesListingPageRoutingModule
  ],
  declarations: [CategoriesListingPage]
})
export class CategoriesListingPageModule {}
