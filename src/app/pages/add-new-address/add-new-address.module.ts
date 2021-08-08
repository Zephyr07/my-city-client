import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewAddressPageRoutingModule } from './add-new-address-routing.module';

import { AddNewAddressPage } from './add-new-address.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddNewAddressPageRoutingModule
  ],
  declarations: [AddNewAddressPage]
})
export class AddNewAddressPageModule {}
