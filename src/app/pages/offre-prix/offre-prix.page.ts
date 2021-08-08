import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {ApiProvider} from '../../providers/api/api';
import {LoadingController, ModalController} from '@ionic/angular';
import * as _ from 'lodash';

@Component({
  selector: 'app-offre-prix',
  templateUrl: './offre-prix.page.html',
  styleUrls: ['./offre-prix.page.scss'],
})
export class OffrePrixPage implements OnInit {

    private offre: any;
    private prix: any;
    private allPrice: any = [];

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        private api: ApiProvider,
        private modalCtrl: ModalController,
        private loadingCtrl: LoadingController
    ) {
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.prix = this.router.getCurrentNavigation().extras.state.prix;
                this.getOffreWithPrix(this.prix.id);
            } else {
                this.getOffreWithPrix(8);
            }
        });

    }

    ngOnInit() {

    }

    async openOffreDetail(p) {
        const navigationExtra: NavigationExtras = {state: {offre: {offre_id: this.prix.id, prix: p}}};
        this.router.navigateByUrl('offre-detail', navigationExtra);
    }

    async getOffreWithPrix(id) {
        const loading = await this.loadingCtrl.create({
            message: 'Chargement...'
        });
        loading.present();

        const opt = {
            should_paginate: false,
            _includes: 'prix_offres.entreprises',
            statut: 'active'
        };
        this.api.Offres.get(id, opt).subscribe(d => {
            this.allPrice = _.orderBy(d.body.prix_offres, 'valeur');
            this.offre = d.body;
            loading.dismiss();
        }, q => {
            console.log('erreur chargement', q);
            loading.dismiss();
        });
    }
}