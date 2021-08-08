import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IniscreenPage } from './iniscreen.page';

const routes: Routes = [
  {
    path: '',
    component: IniscreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IniscreenPageRoutingModule {}
