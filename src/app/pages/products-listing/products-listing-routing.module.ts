import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsListingPage } from './products-listing.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsListingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsListingPageRoutingModule {}
