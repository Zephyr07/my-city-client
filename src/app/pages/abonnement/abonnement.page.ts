import { Component, OnInit } from '@angular/core';
import {ApiProvider} from '../../providers/api/api';
import {AlertController, LoadingController} from '@ionic/angular';
import {AuthProvider} from '../../providers/auth/auth';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-abonnement',
  templateUrl: './abonnement.page.html',
  styleUrls: ['./abonnement.page.scss'],
})
export class AbonnementPage implements OnInit {

  private type_abonnements: any = [];
  private url_dohone = 'https://www.my-dohone.com/dohone/';
  private url_sandbox = 'https://www.my-dohone.com/dohone-sandbox/';
  private telephone = 0;
  private otp = 0;
  private client: any = {};
  constructor(
      private api: ApiProvider,
      private auth: AuthProvider,
      private alertController: AlertController,
      private http: HttpClient,
      private loadingCtrl: LoadingController
  ) {
    this.getTypeAbonnements();
    this.auth.getContext().then((d: any) => {
      this.client = JSON.parse(d).clients;
    }, e => {
      console.log(e);
    });
  }

  ngOnInit() {
  }

  async getTypeAbonnements(){
    const loading = await this.loadingCtrl.create({
      message: 'Chargement des abonnements...'
    });
    loading.present();
    this.api.TypeAbonnements.getList({_sort: 'duree', _sortDir: 'asc', statut: 'active'}).subscribe((d: any) => {
      this.type_abonnements = d;
      loading.dismiss();
    });
  }

  acheterAbonnement(a){
    const opt = {
      user_id: this.client.user_id,
      montant: a.prix,
      type_abonnements_id: a.id,
      telephone: 696870700,
      mode_paiement: 'om'
    };
    // console.log('abo', a, opt);

  }

    async alertOM(p) {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Informations de paiement',
            message: 'Composer le #150*44# depuis votre téléphone pour obtenir le code OTP',
            inputs: [
                {
                    name: 'telephone',
                    type: 'number',
                    label: 'Numéro de téléphone',
                    min: 600000000,
                    max: 999999999,
                    placeholder: 'Téléphone'
                },
                {
                    name: 'otp',
                    label: 'Code OTP Orange',
                    type: 'number',
                    min: 0,
                    max: 999999,
                    placeholder: 'Code OTP'
                }
            ],
            buttons: [
                {
                    text: 'Annuler',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Payer',
                    handler: (d: any) => {
                        console.log('Confirm Ok');
                        this.telephone = d.telephone;
                        this.otp = d.otp;
                        this.payer('om', p);
                    }
                }
            ]
        });

        await alert.present();
    }

    async alertMoMo(mode, p) {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Informations de paiement',
            inputs: [
                {
                    name: 'telephone',
                    type: 'number',
                    label: 'Numéro de téléphone',
                    min: 600000000,
                    max: 999999999,
                    placeholder: 'Téléphone'
                }
            ],
            buttons: [
                {
                    text: 'Annuler',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Payer',
                    handler: (d: any) => {
                        console.log('Confirm Ok');
                        this.telephone = d.telephone;
                        this.payer(mode, p);
                    }
                }
            ]
        });

        await alert.present();
    }

  async confirmation(p) {
    const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Code de confirmation',
        message: 'Entrer le code que vous avez reçu par sms',
        inputs: [
            {
                name: 'code',
                type: 'text',
                placeholder: 'Code de confirmation'
            }
        ],
        buttons: [
            {
                text: 'Annuler',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                    console.log('Confirm Cancel');
                }
            }, {
                text: 'Valider',
                handler: (d: any) => {
                    console.log('Confirm Ok');
                    this.telephone = d.telephone;
                    this.confirmationVirement(d.code);
                }
            }
        ]
    });

    await alert.present();
  }

  payer(mode, abonnement: any){
    // initialisation de la commande DOHONE
    const xxx = 'CZ216K29371047143059308';
    if (mode === 'om') {
        this.http.get(this.url_dohone + 'pay?cmd=start&rN=' + this.client.nom + '&rDvs=XAF&rMt=' + abonnement.prix + '&rMo=2&rT=' + this.telephone
            + '&rH=' + xxx + '&rI=' + abonnement.nom + '&source=Ma+Ville&rOTP' + this.otp)
            .subscribe((res: any) => {
                console.log(res);
            }, err => {
                console.log(err);
            });
    } else if (mode === 'momo') { // MTN
        this.http.get(this.url_dohone + 'pay?cmd=start&rN=' + this.client.nom + '&rDvs=XAF&rMt=' + abonnement.prix + '&rMo=1&rT=' + this.telephone
            + '&rH=' + xxx + '&rI=' + abonnement.nom + '&source=Ma+Ville')
            .subscribe((res: any) => {
                console.log(res);
            }, err => {
                console.log(err);
                alert(err.error.text);
            });
    } else if (mode === 'dohone') { // MTN
        this.http.get(this.url_sandbox + 'pay?cmd=start&rN=' + this.client.nom + '&rDvs=XAF&rMt=' + abonnement.prix + '&rMo=10&rT=' + this.telephone
            + '&rH=' + xxx + '&rI=' + abonnement.nom + '&source=Ma+Ville')
            .subscribe((res: any) => {
                console.log(res);
            }, err => {
                console.log(err);
                alert(err.error.text);
            });
    }
  }

  verification(nom, montant, code_transaction) {
      this.http.get('https://www.my-dohone.com/dohone/pay?cmd=verify&rI=' + nom + '&rMt=' + montant + '&idReqDoh=' + code_transaction)
          .subscribe((res: any) => {
              console.log(res);
          }, err => {
              console.log(err);
              alert(err.error.text);
          });
  }
    //https://www.my-dohone.com/dohone-sandbox/pay?cmd=cfrmsms&rCS=H1317&rT=682000316
  confirmationVirement(code){
      this.http.get(this.url_sandbox + 'pay?cmd=cfrmsms&rCS=' + code + '&rT=' + this.telephone)
          .subscribe((res: any) => {
              console.log(res);
          }, err => {
              console.log(err);
              if (err.statusText === 'OK') {
                  //
              } else {
                  // echec
                  alert(err.error.text);
              }
          });
  }
}
