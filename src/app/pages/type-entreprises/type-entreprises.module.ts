import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TypeEntreprisesPageRoutingModule } from './type-entreprises-routing.module';

import { TypeEntreprisesPage } from './type-entreprises.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TypeEntreprisesPageRoutingModule
  ],
  declarations: [TypeEntreprisesPage]
})
export class TypeEntreprisesPageModule {}
