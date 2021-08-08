import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsListingPageRoutingModule } from './products-listing-routing.module';

import { ProductsListingPage } from './products-listing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsListingPageRoutingModule
  ],
  declarations: [ProductsListingPage]
})
export class ProductsListingPageModule {}
