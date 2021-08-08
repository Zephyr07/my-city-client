import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntrepriseListingPage } from './entreprise-listing.page';

const routes: Routes = [
  {
    path: '',
    component: EntrepriseListingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntrepriseListingPageRoutingModule {}
