import { Component, OnInit } from '@angular/core';
import {ApiProvider} from '../../providers/api/api';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-categories-listing',
  templateUrl: './categories-listing.page.html',
  styleUrls: ['./categories-listing.page.scss'],
})
export class CategoriesListingPage implements OnInit {
    private categories: any = [];
    private nom = '';
    constructor(
        public route: ActivatedRoute,
        public router: Router,
        private api: ApiProvider,
        private loadingCtrl: LoadingController
    ) {
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                const id = this.router.getCurrentNavigation().extras.state.id;
                const encoded = this.router.getCurrentNavigation().extras.state.nom;
                const decoded = encoded.replace(/&amp;/g, '&');
                this.nom = decoded;
                this.getCategories(id);
            }

        });
    }

    ngOnInit() {
    }

    openOffreByCategories(o){
        const navigationExtra: NavigationExtras = { state: { categories: { id: o.id, nom: o.nom} } };
        this.router.navigateByUrl('offre-listing', navigationExtra);
    }

    async getCategories(id){
        const loading = await this.loadingCtrl.create({
            message: 'Chargement des catégories...'
        });
        loading.present();
        this.api.Categories.getList({statut: 'active', parent_id: id, should_paginate: false, _sort: 'nom', _sortDir: 'asc'}).subscribe(d => {
            this.categories = d;
            console.log(d);
            loading.dismiss();
        }, e => {
            console.log(e);
            loading.dismiss();
        });
    }


}
