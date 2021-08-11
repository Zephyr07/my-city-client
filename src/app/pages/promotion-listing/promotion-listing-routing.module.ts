import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PromotionListingPage } from './promotion-listing.page';

const routes: Routes = [
  {
    path: '',
    component: PromotionListingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromotionListingPageRoutingModule {}
