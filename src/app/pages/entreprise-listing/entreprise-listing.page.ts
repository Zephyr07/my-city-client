import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {LoadingController, ModalController} from "@ionic/angular";
import {CategoriesPage} from "../categories/categories.page";
import {FiltersPage} from "../filters/filters.page";
import {SortingPage} from "../sorting/sorting.page";
import {ApiProvider} from "../../providers/api/api";
import * as _ from "lodash";
import {TypeEntreprisesPage} from "../type-entreprises/type-entreprises.page";

@Component({
  selector: 'app-entreprise-listing',
  templateUrl: './entreprise-listing.page.html',
  styleUrls: ['./entreprise-listing.page.scss'],
})
export class EntrepriseListingPage implements OnInit {

    private typeEntreprise: any;
    private allProducts: any = [];
    private allEntreprises: any = [];
    private noteEntreprises: any = [];
    private newProducts: any = [];
    private activeTab: any;
    private cartProducts: any = [];
    private badge: boolean = false;
    private showAddToCart: boolean;
    private hoverAdded: any;
    defaultImage: string = "../../../assets/img/no-image.jpg";
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
                this.typeEntreprise = this.router.getCurrentNavigation().extras.state.type_entreprise;
                let encoded = this.typeEntreprise.title;
                let decoded = encoded.replace(/&amp;/g, '&');
                this.typeEntreprise.nom = decoded;
                console.log(this.typeEntreprise);
            }




        });
        this.activeTab = 'all';
        // this.getProducts();
        this.getEntreprisesByType();

    }

    ionViewWillEnter() {
        this.cartProducts = window.localStorage.getItem('cartProducts') ? JSON.parse(window.localStorage.getItem('cartProducts')) : [];
    }

    ngOnInit() {
    }


    async openTypeEntreprises() {
        const modal = await this.modalCtrl.create({
            component: TypeEntreprisesPage,
            cssClass: 'my-custom-class',
        });

        modal.onDidDismiss()
            .then((data) => {
                if (data.role !== undefined)
                    this.typeEntreprise = data.role;
                this.getEntreprisesByType();
            });
        return await modal.present();
    }

    tabChanged(ev) {
        this.activeTab = ev.detail.value;
        if (this.activeTab === 'all') {
            this.allEntreprises = _.orderBy(this.allEntreprises, 'nom');
        } else {
            this.allEntreprises = _.orderBy(this.allEntreprises, 'created_at').reverse();
        }
    }

    async getEntreprisesByType() {
        const loading = await this.loadingCtrl.create({
            message: 'Chargement...'
        });
        loading.present();

        const opt = {
            type_entreprises_id: this.typeEntreprise.id,
            should_paginate: false,
            _includes: 'localisations.villes,note_entreprises.notes',
            statut : 'active'
        };
        this.api.Entreprises.getList(opt).subscribe( d => {
            // classement des notes
            d.forEach(entreprise => {
                entreprise.telephone = this.api.formarPrice(entreprise.telephone);
                let sumNote = 0;
                entreprise.notes = 0;
                entreprise.note_entreprises.forEach(v => {
                    console.log(v.notes.valeur);
                    if (v.notes.valeur === undefined) {
                        v.notes.valeur = 0;
                    }
                    sumNote += v.notes.valeur;
                });
                if (entreprise.note_entreprises.length !== 0) {
                    entreprise.notes = sumNote / entreprise.note_entreprises.length;
                }

            });
            this.allEntreprises = d;
            loading.dismiss();
        }, q => {
            console.log('erreur chargement', q);
            loading.dismiss();
        });
    }
}
