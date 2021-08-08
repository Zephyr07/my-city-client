import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { regexValidators } from '../../services/validator.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-add-new-address',
  templateUrl: './add-new-address.page.html',
  styleUrls: ['./add-new-address.page.scss'],
})
export class AddNewAddressPage implements OnInit {
  private addForm: FormGroup;
  private countryData: any = [];
  private stateData: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController
  ) {
    this.countryData = [{ country_id: '1', name: 'USA' }];
    this.stateData = [{ state_id: '1', name: 'New York' }, { state_id: '2', name: 'Pennsylvania' }];

    this.addForm = this.formBuilder.group({
      firstname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(regexValidators.name)
      ])
      ),
      lastname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(regexValidators.name)
      ])
      ),
      postcode: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(regexValidators.postalCode)
      ])
      ),
      country_id: new FormControl(''),
      state_id: new FormControl(''),

      address_1: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150)
      ])
      )

    });


  }

  ngOnInit() {
  }

  async addAddress() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: 'Address added',
      buttons: [{
        text: 'Okay',
        handler: () => {
          window.localStorage.setItem('data', JSON.stringify(this.addForm.value));
          this.addForm.reset();
        }
      }]
    });

    await alert.present();
  }

}
