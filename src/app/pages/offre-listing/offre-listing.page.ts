import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {LoadingController, ModalController} from '@ionic/angular';
import {CategoriesPage} from '../categories/categories.page';
import {ApiProvider} from '../../providers/api/api';
import * as _ from 'lodash';

@Component({
  selector: 'app-offre-listing',
  templateUrl: './offre-listing.page.html',
  styleUrls: ['./offre-listing.page.scss'],
})
export class OffreListingPage implements OnInit {

    private categories: any;
    private marque: any;
    private allOffres: any = [];
    private activeTab: any;
    constructor(
        public route: ActivatedRoute,
        public router: Router,
        private apiService: ApiService,
        private api: ApiProvider,
        private modalCtrl: ModalController,
        private loadingCtrl: LoadingController
    ) {
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                const state = this.router.getCurrentNavigation().extras.state;
                if (state.categories){
                    this.categories = this.router.getCurrentNavigation().extras.state.categories;
                    const encoded = this.categories.nom;
                    const decoded = encoded.replace(/&amp;/g, '&');
                    this.categories.nom = decoded;
                    this.getOffresByCategories();
                } else if (state.marque) {
                    this.getOffresByMarque(state.marque.id);
                    const encoded = state.marque.nom;
                    const decoded = encoded.replace(/&amp;/g, '&');
                    this.marque = decoded;
                }
            }
        });
        this.activeTab = 'all';
    }

    ngOnInit() {
    }

    async openOffrePrix(title, id) {
        const navigationExtra: NavigationExtras = { state: { prix: { nom: title, id} } };
        this.router.navigateByUrl('offre-prix', navigationExtra);
    }

    async openCategories() {
        const modal = await this.modalCtrl.create({
            component: CategoriesPage,
            cssClass: 'my-custom-class',
        });

        modal.onDidDismiss()
            .then((data) => {
                if (data.role !== undefined) {
                    this.categories = data.role;
                }
                this.getOffresByCategories();
            });
        return await modal.present();
    }

    tabChanged(ev) {
        this.activeTab = ev.detail.value;
        // chassement suivant le choix
        if (this.activeTab === 'all') {
          this.allOffres = _.orderBy(this.allOffres, 'nom');
        } else {
            this.allOffres = _.orderBy(this.allOffres, 'created_at').reverse();
        }
    }

    async getOffresByCategories() {
        const loading = await this.loadingCtrl.create({
            message: 'Chargement...'
        });
        loading.present();

        const opt = {
            categories_id: this.categories.id,
            should_paginate: false,
            _includes: 'prix_offres,note_offres.notes',
            statut : 'active'
        };
        this.api.Offres.getList(opt).subscribe( d => {
            d.forEach(offres => {
              offres.loaded = false;
              let sumNote = 0;
              offres.notes = 0;
              offres.note_offres.forEach(v => {
                if (v.notes.valeur === undefined) {
                    v.notes.valeur = 0;
                }
                sumNote += v.notes.valeur;
              });
              if (offres.note_offres.length !== 0) {
                  offres.notes = sumNote / offres.note_offres.length;
              }
            });
            this.allOffres = d;
            loading.dismiss();
        }, q => {
            console.log('erreur chargement', q);
            loading.dismiss();
        });
    }

    async getOffresByMarque(id) {
        const loading = await this.loadingCtrl.create({
            message: 'Chargement...'
        });
        loading.present();

        const opt = {
            marque_id: id,
            should_paginate: false,
            _includes: 'prix_offres,note_offres.notes',
            statut : 'active'
        };
        this.api.Offres.getList(opt).subscribe( d => {
            d.forEach(offres => {
              offres.loaded = false;
              let sumNote = 0;
              offres.notes = 0;
              offres.note_offres.forEach(v => {
                if (v.notes.valeur === undefined) {
                    v.notes.valeur = 0;
                }
                sumNote += v.notes.valeur;
              });
              if (offres.note_offres.length !== 0) {
                  offres.notes = sumNote / offres.note_offres.length;
              }
            });
            this.allOffres = d;
            loading.dismiss();
        }, q => {
            console.log('erreur chargement', q);
            loading.dismiss();
        });
    }
}
