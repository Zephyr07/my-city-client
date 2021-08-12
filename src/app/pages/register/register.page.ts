import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { regexValidators } from '../../services/validator.service';
import {LoadingController, MenuController} from '@ionic/angular';
import {ApiProvider} from '../../providers/api/api';
import {AuthProvider} from '../../providers/auth/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  private signupForm: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private api: ApiProvider,
    private auth: AuthProvider,
    private menu: MenuController,
    private loadingCtrl: LoadingController
  ) {
    this.menu.enable(false, 'custom');

    this.signupForm = this.formBuilder.group({
      first_name: new FormControl('', Validators.compose([
        Validators.required,
      ])
      ),
      last_name: new FormControl('', Validators.compose([
        Validators.required,
      ])
      ),
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(regexValidators.phone)
      ])
      ),
        genre: new FormControl('', Validators.compose([
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
    });
  }

  ngOnInit() {
  }

  async register() {
    const loading = await this.loadingCtrl.create({
        message: 'Creation du compte...'
    });
    loading.present();
    // creation de l'utilisateur
    const user = {
      email : this.signupForm.value.email,
      password : this.signupForm.value.password,
      password_confirmation : this.signupForm.value.password,
      nom : this.signupForm.value.first_name + ' ' + this.signupForm.value.last_name,
      telephone : this.signupForm.value.phone,
      genre : this.signupForm.value.genre,
    };
    this.auth.register(user).then(rep => {
      this.api.TypeAbonnements.getList({duree: 1}).subscribe(d => {
        // paiement 0
        this.api.Paiements.post({montant: 0, mode_paiement: 'inscription', code_transaction: rep.user.id + 'tran' + d[0].id}).subscribe(p => {
          this.api.Abonnements.post({user_id: rep.user.id, type_abonnements_id: d[0].id, paiements_id: p.body.id, statut: 'active'}).subscribe(da => {
            // redirection vers la page d'abonnement
            loading.dismiss();
            this.router.navigate(['/dashboard'], { replaceUrl: true });
          }, (err) => {
              loading.dismiss();
          });
        }, (err) => {
            loading.dismiss();
        });

      }, (err) => {
          loading.dismiss();
      });

    }).catch((err) => {
        loading.dismiss();
    });
  }

}
