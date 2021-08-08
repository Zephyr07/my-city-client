import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersListingPageRoutingModule } from './orders-listing-routing.module';

import { OrdersListingPage } from './orders-listing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersListingPageRoutingModule
  ],
  declarations: [OrdersListingPage]
})
export class OrdersListingPageModule {}
