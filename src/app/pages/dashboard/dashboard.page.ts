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
  private categories: any = [];
  private typeEntreprises: any = [];
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
    this.getCategories();
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

  getCategories() {
    this.apiService.getCategories().then((result: any) => {
      this.categories = result.data;
      //console.log('this.categories', this.categories[0]);
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
      console.log(title);
    const navigationExtra: NavigationExtras = { state: { type_entreprise: { title: title, id: id} } }
    this.router.navigateByUrl('entreprise-listing', navigationExtra);
  }

  async search() {
    const modal = await this.modalCtrl.create({
      component: SearchPage,
      cssClass: 'my-custom-class',
    });

    return await modal.present();
  }

  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };

}
