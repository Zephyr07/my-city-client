import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TypeEntreprisesPage } from './type-entreprises.page';

const routes: Routes = [
  {
    path: '',
    component: TypeEntreprisesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypeEntreprisesPageRoutingModule {}
