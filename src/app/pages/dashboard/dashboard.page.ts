import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { SearchPage } from '../search/search.page';
import { ModalController, MenuController } from '@ionic/angular';
import {ApiProvider} from '../../providers/api/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  private mainSlider: any = [];
  private cartProducts: any = [];
  private marques: any = [];
  private promotions: any = [];
  private typeEntreprises: any = [];
  public slideOptsOne = {
      initialSlide: 0,
      slidesPerView: 1,
      speed : 2000,
      autoplay: true
  };
  constructor(
    private apiService: ApiService,
    private api: ApiProvider,
    private router: Router,
    private dataService: DataService,
    private modalCtrl: ModalController,
    private menu: MenuController
  ) {
    this.menu.enable(true, 'custom');
    this.getBanners();
    this.getMarques();
    this.getPromotions();
    this.getTypeEntreprises();
  }

  ionViewWillEnter() {
    this.cartProducts = window.localStorage.getItem('cartProducts') ? JSON.parse(window.localStorage.getItem('cartProducts')) : [];
  }

  ngOnInit() {

  }

  getBanners() {
    this.apiService.getDashboardBanners().then((result: any) => {
      this.mainSlider = result.appbanners.slider;
    })
  }

  getTypeEntreprises(){
      this.api.TypeEntreprises.getList({_sort: 'nom', _sortDir: 'asc', should_paginate: false}).subscribe(d => {
          this.typeEntreprises = d;
      });
  }

  getMarques(){
    const opt = {
      should_paginate : true,
      per_page: 4,
      statut : 'active',
      _sort: 'nom',
      _sortDir: 'asc'
    };
    this.api.Marques.getList(opt).subscribe(d => {
      console.log(d);
      this.marques = d;
    });
  }

  getPromotions(){
    const opt = {
      should_paginate : true,
      per_page: 4,
      statut : 'active',
      _sort: 'priorite',
      _sortDir: 'desc'
    };
    this.api.Promotions.getList(opt).subscribe(d => {
      console.log(d);
      this.promotions = d;
    });
  }

  cart() {
    this.router.navigate(['/cart']);
  }

  productListing(title, total) {
    const navigationExtra: NavigationExtras = { state: { category: { title: title, total: total } } }
    this.router.navigateByUrl('products-listing', navigationExtra);
  }

  entreprisesListing(title, id) {
    const navigationExtra: NavigationExtras = { state: { type_entreprise: { title: title, id: id} } }
    this.router.navigateByUrl('entreprise-listing', navigationExtra);
  }

  promotionsLinsting() {
    this.router.navigateByUrl('promotion-listing');
  }

  async search() {
    const modal = await this.modalCtrl.create({
      component: SearchPage,
      cssClass: 'my-custom-class',
    });

    return await modal.present();
  }

}
