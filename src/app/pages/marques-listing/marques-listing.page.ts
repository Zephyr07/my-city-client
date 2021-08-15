import { Component, OnInit } from '@angular/core';
import {ApiProvider} from '../../providers/api/api';
import {LoadingController} from '@ionic/angular';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-marques-listing',
  templateUrl: './marques-listing.page.html',
  styleUrls: ['./marques-listing.page.scss'],
})
export class MarquesListingPage implements OnInit {
  private marques: any = [];
  constructor(
      private api: ApiProvider,
      public router: Router,
      private loadingCtrl: LoadingController
  ) {
      this.getMarques();
  }

  ngOnInit() {
  }

  openOffreByMarque(id, nom){
      const navigationExtra: NavigationExtras = { state: { marque: { id, nom} } };
      this.router.navigateByUrl('offre-listing', navigationExtra);
  }

  async getMarques(){
    const loading = await this.loadingCtrl.create({
        message: 'Chargement des marques...'
    });
    loading.present();
    this.api.Marques.getList({statut: 'active', should_paginate: false, _sort: 'nom', _sortDir: 'asc'}).subscribe(d => {
      this.marques = d;
      loading.dismiss();
    }, e => {
      console.log(e);
      loading.dismiss();
    });
  }

}
