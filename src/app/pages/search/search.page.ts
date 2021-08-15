import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { NavigationExtras, Router } from '@angular/router';
import {ApiProvider} from '../../providers/api/api';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  private searchTerm = '';
  private searchControl: FormControl;
  private searching: any = false;
  private sous_categories: any = [];
  private marques: any = [];
  private offres: any = [];
  private entreprises: any = [];
  private type_entreprises: any = [];
  constructor(
    private dataService: DataService,
    private modalCtrl: ModalController,
    private api: ApiProvider,
    private apiService: ApiService,
    private router: Router
  ) {
    this.searchControl = new FormControl();
  }

  ngOnInit(){

  }

  onSearchInput() {
    if (this.searchTerm.length >= 3) {
      this.searching = true;
      this.getSousCategoriesByNom();
      this.getEntrepriseByNom();
      this.getTypeEntrepriseByNom();
      this.getMarqueByNom();
      this.getOffreByNom();
    } else {
      this.searching = false;
      this.sous_categories = [];
      this.marques = [];
      this.offres = [];
      this.entreprises = [];
      this.type_entreprises = [];
    }
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  openOffrePrix(title, id) {
    this.dismiss();
    const navigationExtra: NavigationExtras = { state: { prix: { nom: title, id} } };
    this.router.navigateByUrl('offre-prix', navigationExtra);
  }

  openOffreByMarque(id, nom){
    this.dismiss();
    const navigationExtra: NavigationExtras = { state: { marque: { id, nom} } };
    this.router.navigateByUrl('offre-listing', navigationExtra);
  }

  openOffreBySousCategories(subPage){
    this.dismiss();
    const  navigationExtra: NavigationExtras = { state: {sous_categories: {nom: subPage.nom, id: subPage.id}}};
    this.router.navigate(['offre-listing'], navigationExtra);
  }

  openEntrepriseDetail(p) {
    this.dismiss();
    const navigationExtra: NavigationExtras = {state: {entreprise: {id: p.id}}};
    this.router.navigateByUrl('entreprise-detail', navigationExtra);
  }

  entreprisesListing(title, id) {
    this.dismiss();
    const navigationExtra: NavigationExtras = { state: { type_entreprise: { title, id} } };
    this.router.navigateByUrl('entreprise-listing', navigationExtra);
  }

  getSousCategoriesByNom(){
    if (this.searchTerm.length >= 3) {
      const opt = {
        'nom-lk': this.searchTerm,
        statut: 'active',
        _sort: 'nom',
        _sortDir: 'asc',
        should_paginate: false,
      };

      this.api.SousCategories.getList(opt).subscribe(d => {
        this.sous_categories = d;
        this.searching = false;
      }, e => {
        console.log(e);
      });
    }
  }
  getEntrepriseByNom(){
    if (this.searchTerm.length >= 3) {
      const opt = {
        'nom-lk': this.searchTerm,
        statut: 'active',
        _sort: 'nom',
        _sortDir: 'asc',
        should_paginate: false,
      };

      this.api.Entreprises.getList(opt).subscribe(d => {
        this.entreprises = d;
        this.searching = false;
      }, e => {
        console.log(e);
      });
    }
  }
  getTypeEntrepriseByNom(){
    if (this.searchTerm.length >= 3) {
      const opt = {
        'nom-lk': this.searchTerm,
        statut: 'active',
        _sort: 'nom',
        _sortDir: 'asc',
        should_paginate: false,
      };

      this.api.TypeEntreprises.getList(opt).subscribe(d => {
        this.type_entreprises = d;
        this.searching = false;
      }, e => {
        console.log(e);
      });
    }
  }
  getMarqueByNom(){
    if (this.searchTerm.length >= 3) {
      const opt = {
        'nom-lk': this.searchTerm,
        statut: 'active',
        _sort: 'nom',
        _sortDir: 'asc',
        should_paginate: false,
      };
      this.api.Marques.getList(opt).subscribe(d => {
        this.marques = d;
        this.searching = false;
      }, e => {
        console.log(e);
      });
    }
  }
  getOffreByNom(){
    if (this.searchTerm.length >= 3) {
      const opt = {
        'nom-lk': this.searchTerm,
        statut: 'active',
        _sort: 'nom',
        _sortDir: 'asc',
        should_paginate: false,
      };

      this.api.Offres.getList(opt).subscribe(d => {
        this.offres = d;
        this.searching = false;
      }, e => {
        console.log(e);
      });
    }
  }

}
