import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { regexValidators } from '../../services/validator.service';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private loginForm: FormGroup;
  private resetForm: FormGroup;
  private activeTab: any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private menu: MenuController
  ) {
    this.menu.enable(false, 'custom');
    this.activeTab = 'login';
    this.loginForm = this.formBuilder.group({
      email: new FormControl('sales@opensourcetechnologies.com', Validators.compose([
        Validators.required,
        Validators.pattern(regexValidators.email)
      ])
      ),
      password: new FormControl('demo1234', Validators.compose([
        Validators.required,
        Validators.pattern(regexValidators.password)
      ])
      ),
    })

    this.resetForm = this.formBuilder.group({
      email: new FormControl('sales@opensourcetechnologies.com', Validators.compose([
        Validators.required,
        Validators.pattern(regexValidators.email)
      ])
      )
    })

  }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['/dashboard'], { replaceUrl: true });
  }

  async reset() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: 'New password has been sent to your registered email address.',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.activeTab = 'login';
          }
        }
      ]
    });

    await alert.present();
  }

}
