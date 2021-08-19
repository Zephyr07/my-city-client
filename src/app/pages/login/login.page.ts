import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { regexValidators } from '../../services/validator.service';
import {AlertController, LoadingController, MenuController} from '@ionic/angular';
import {AuthProvider} from '../../providers/auth/auth';
import {ApiProvider} from '../../providers/api/api';
import * as moment from 'moment';

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
    private api: ApiProvider,
    private auth: AuthProvider,
    private alertController: AlertController,
    private menu: MenuController,
    private loadingCtrl: LoadingController
  ) {
    this.menu.enable(false, 'custom');
    this.activeTab = 'login';
    this.loginForm = this.formBuilder.group({
      email: new FormControl('enanda52@gmail.com', Validators.compose([
        Validators.required,
        Validators.pattern(regexValidators.email)
      ])
      ),
      password: new FormControl('T@rija00', Validators.compose([
        Validators.required,
        Validators.pattern(regexValidators.password)
      ])
      ),
    });

    this.resetForm = this.formBuilder.group({
      email: new FormControl('sales@opensourcetechnologies.com', Validators.compose([
        Validators.required,
        Validators.pattern(regexValidators.email)
      ])
      )
    });

  }

  ngOnInit() {
  }

  async login() {
    const loading = await this.loadingCtrl.create({
        message: 'Connexion...'
    });
    loading.present();
    const param = {
      email : this.loginForm.value.email,
        password : this.loginForm.value.password,
    };

    this.auth.login(param).then((d: any) => {
      // verification de l'abonnement de l'utilisateur
      const opt = {
        _includes : 'type_abonnements',
        _sort: 'created_at',
        _sortDir: 'desc',
        statut: 'active',
        user_id: d.user.id
      };
      this.api.Abonnements.getList(opt).subscribe(abonnement => {
        if (moment(d.user.created_at).add('days', '30') > moment(new Date())) {
          // l'utilisateur est encore dans son mois gratuit
          loading.dismiss();
          this.router.navigate(['/dashboard'], { replaceUrl: true });
        } else {
          // verification si l'utilisateur à un autre abonnement
          if (abonnement.length > 1) {
            // verification de la date du dernier abonnement
            const ab = abonnement[abonnement.length - 1]; // dernier abonnement de l'utilisateur
            const duree = ab.type_abonnements.duree;
            if (moment(ab.created_at).add('month', duree) > moment(new Date())) {
              // abonnement actif, redirection vers la page d'abonnement
              loading.dismiss();
              this.router.navigate(['/dashboard'], { replaceUrl: true });
            } else {
              // abonnement expiré, redirection vers le dashboard
              loading.dismiss();
              this.router.navigate(['/abonnement'], { replaceUrl: true });
            }
          } else {
            // console.log('aucune autre abonnement');
            // abonnement expiré, redirection vers la page d'abonnement
            loading.dismiss();
            this.router.navigate(['/abonnement'], { replaceUrl: true });
          }
        }
      });
    }, err => {
      console.log(err);
      loading.dismiss();
    });

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
