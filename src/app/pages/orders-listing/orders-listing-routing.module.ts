import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersListingPage } from './orders-listing.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersListingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersListingPageRoutingModule {}
