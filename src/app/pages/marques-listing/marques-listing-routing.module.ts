import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarquesListingPage } from './marques-listing.page';

const routes: Routes = [
  {
    path: '',
    component: MarquesListingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarquesListingPageRoutingModule {}
