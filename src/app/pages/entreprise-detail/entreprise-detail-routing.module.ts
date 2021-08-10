import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntrepriseDetailPage } from './entreprise-detail.page';

const routes: Routes = [
  {
    path: '',
    component: EntrepriseDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntrepriseDetailPageRoutingModule {}
