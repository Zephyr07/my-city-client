import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { regexValidators } from '../../services/validator.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private updateForm: FormGroup;
  constructor(
    private alertController: AlertController,
    private formBuilder: FormBuilder
  ) {
    this.updateForm = this.formBuilder.group({
      name: new FormControl('Mark', Validators.compose([
        Validators.required,
        Validators.pattern(regexValidators.name)
      ])
      ),
      city: new FormControl('Pennsylvania', Validators.compose([
        Validators.required,
        Validators.pattern(regexValidators.name)
      ])
      ),
      email: new FormControl('sales@opensourcetechnologies.com', Validators.compose([
        Validators.required,
        Validators.pattern(regexValidators.email)
      ])
      ),
      mobile: new FormControl('9876543210', Validators.compose([
        Validators.required,
        Validators.pattern(regexValidators.phone)
      ])
      )
    })

  }

  ngOnInit() {
  }

  async update() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: 'Profile has been updated',
      buttons: ['OK']
    });

    await alert.present();
  }

}
