import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { regexValidators } from '../../services/validator.service';
import { AlertController, ModalController, MenuController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { SearchLocationPage } from '../search-location/search-location.page';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  private signupForm: FormGroup;
  private countries: any = [];
  private location: any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private apiService: ApiService,
    private modalCtrl: ModalController,
    private menu: MenuController
  ) {
    this.menu.enable(false, 'custom');
    this.getCountries();

    this.signupForm = this.formBuilder.group({
      first_name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(regexValidators.name)
      ])
      ),
      last_name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(regexValidators.name)
      ])
      ),
      zip_code: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(regexValidators.postalCode)
      ])
      ),
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(regexValidators.phone)
      ])
      ),
      country: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(regexValidators.name)
      ])
      ),
      location: new FormControl('', Validators.compose([
        Validators.required
      ])
      ),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(regexValidators.email)
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

  getCountries() {
    this.apiService.getCountries().then((result: any) => {
      this.countries = result.data;
      console.log('Ress', result);
    })
  }

  goToDashboard() {
    this.router.navigate(['/dashboard'], { replaceUrl: true });
  }

  async register() {
    console.log(this.signupForm)
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: 'Your account is now created. Please login to contninue',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.router.navigate(['/login'], { replaceUrl: true });
          }
        }
      ]
    });

    await alert.present();
  }

  async selectLocation() {
    console.log(this.signupForm.get('country'));
    if (this.signupForm.get('country').value != '') {
      const modal = await this.modalCtrl.create({
        component: SearchLocationPage,
        cssClass: 'my-custom-class',
      });

      modal.onDidDismiss()
        .then((data) => {
          console.log(data);
          if (data['data'] != undefined)
            this.location = data['data'];
        });
      return await modal.present();
    }
    else {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        message: 'Please select a country',
        buttons: [
          {
            text: 'Okay',
          }
        ]
      });

      await alert.present();
    }

  }

}
