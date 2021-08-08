import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { regexValidators } from '../../services/validator.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  private updateForm: FormGroup;
  constructor(
    private alertController: AlertController,
    private formBuilder: FormBuilder
  ) {
    this.updateForm = this.formBuilder.group({
      old_password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(regexValidators.password)
      ])
      ),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(regexValidators.password)
      ])
      ),
      confirm_password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(regexValidators.password)
      ])
      )
    })

  }

  ngOnInit() {
  }

  async update() {
    this.updateForm.reset();
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: 'Password has been updated',
      buttons: ['OK']
    });

    await alert.present();
  }

}
