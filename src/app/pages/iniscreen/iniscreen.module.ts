import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IniscreenPageRoutingModule } from './iniscreen-routing.module';

import { IniscreenPage } from './iniscreen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IniscreenPageRoutingModule
  ],
  declarations: [IniscreenPage]
})
export class IniscreenPageModule {}
