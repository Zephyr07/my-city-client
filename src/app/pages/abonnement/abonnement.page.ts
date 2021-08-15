import { Component, OnInit } from '@angular/core';
import {ApiProvider} from '../../providers/api/api';
import {LoadingController, MenuController} from "@ionic/angular";
import {AuthProvider} from "../../providers/auth/auth";

@Component({
  selector: 'app-abonnement',
  templateUrl: './abonnement.page.html',
  styleUrls: ['./abonnement.page.scss'],
})
export class AbonnementPage implements OnInit {

  private type_abonnements: any = [];
  private client: any = {};
  constructor(
      private api: ApiProvider,
      private auth: AuthProvider,
      private loadingCtrl: LoadingController
  ) {
    this.getTypeAbonnements();
    this.auth.getContext().then(d => {
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
    this.api.TypeAbonnements.getList({_sort: 'duree', _sortDir: 'asc', statut: 'active'}).subscribe(d => {
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
    //console.log('abo', a, opt);
    this.api.restangular.all('buy').post(opt).subscribe((data) => {
      console.log('data', data);
      /*if (invoice.body.payment_method === 'momo') {
          //this.router.navigateByUrl('s/account');
          Metro.toast.create('Fonctionnalité encours de developpement');
      } else if (invoice.body.payment_method === 'om') {
          window.location.href = data.body.payment_url;
      }*/
    }, err => {
      console.log(err);
    });
  }

  test(){

  }
}
