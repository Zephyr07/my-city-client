import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, MenuController} from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { regexValidators } from '../../services/validator.service';
import {AuthProvider} from '../../providers/auth/auth';
import {ApiProvider} from '../../providers/api/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private updateForm: FormGroup;
  private user: any;
  private nom = '';
  private activeTab: any;
  constructor(
    private alertController: AlertController,
    private auth: AuthProvider,
    private api: ApiProvider,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController
  ) {
      this.updateForm = this.formBuilder.group({
          nom: new FormControl('', Validators.compose([
                  Validators.required,
                  Validators.pattern(regexValidators.name)
              ])
          ),
          genre: new FormControl('', Validators.compose([
                  Validators.required,
                  Validators.pattern(regexValidators.name)
              ])
          ),
          telephone: new FormControl('', Validators.compose([
                  Validators.required,
                  Validators.pattern(regexValidators.phone)
              ])
          )
      });
      this.activeTab = 'info';
  }

  tabChanged(ev) {
      this.activeTab = ev.detail.value;
  }

  async ngOnInit() {
      const loading = await this.loadingCtrl.create({
          message: 'Chargement...'
      });
      loading.present();
      this.auth.getContext().then((u: any) => {
          this.user = u;
          this.api.Clients.get(u.clients.id).subscribe((d: any) => {
              d = d.body;
              this.nom = d.nom;
              this.updateForm = this.formBuilder.group({
                  nom: new FormControl(d.nom, Validators.compose([
                          Validators.required,
                          Validators.pattern(regexValidators.name)
                      ])
                  ),
                  genre: new FormControl(d.genre, Validators.compose([
                          Validators.required,
                          Validators.pattern(regexValidators.name)
                      ])
                  ),
                  telephone: new FormControl(d.telephone, Validators.compose([
                          Validators.required,
                          Validators.pattern(regexValidators.phone)
                      ])
                  )
              });
              loading.dismiss();
          }, e => {
              console.log(e);
              loading.dismiss();
          });
      }, e => {
          console.log(e);
          loading.dismiss();
      });
  }

  async update() {
    const loading = await this.loadingCtrl.create({
        message: 'Mise à jour...'
    });
    loading.present();
    // recupération du client
    this.api.Clients.get(this.user.clients.id).subscribe(c => {
      c.nom = this.updateForm.value.nom;
      c.genre = this.updateForm.value.genre;
      c.telephone = this.updateForm.value.telephone;
      c.id = this.user.clients.id;
      c.put().subscribe(d => {
        loading.dismiss();
      }, e => {
        console.log(e);
        loading.dismiss();
      });
    }, e => {
        console.log(e);
        loading.dismiss();
    });

  }

}
