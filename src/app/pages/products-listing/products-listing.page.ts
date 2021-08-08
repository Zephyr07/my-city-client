import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ModalController, LoadingController } from '@ionic/angular';
import { CategoriesPage } from '../categories/categories.page';
import { FiltersPage } from '../filters/filters.page';
import { SortingPage } from '../sorting/sorting.page';

@Component({
  selector: 'app-products-listing',
  templateUrl: './products-listing.page.html',
  styleUrls: ['./products-listing.page.scss'],
})
export class ProductsListingPage implements OnInit {
  private category: any;
  private allProducts: any = [];
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
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.category = this.router.getCurrentNavigation().extras.state.category;
        let encoded = this.category.title;
        let decoded = encoded.replace(/&amp;/g, '&');
        this.category.title = decoded;
      }




    });
    this.activeTab = 'all';
    this.getProducts();

  }

  ionViewWillEnter() {
    this.cartProducts = window.localStorage.getItem('cartProducts') ? JSON.parse(window.localStorage.getItem('cartProducts')) : [];
  }

  ngOnInit() {
  }


  async openCategories() {
    const modal = await this.modalCtrl.create({
      component: CategoriesPage,
      cssClass: 'my-custom-class',
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data['role'] != undefined)
          this.category = data['role'];
      });
    return await modal.present();
  }

  tabChanged(ev) {
    this.activeTab = ev.detail.value;
    this.getProducts();
  }

  async getProducts() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...'
    });
    loading.present();
    this.apiService.getProductsName_ASC()
      .then((result: any) => {
        if (this.activeTab == 'all') {
          loading.dismiss();
          this.allProducts = result.data;
          this.allProducts.forEach(element => {
            element.loaded = false;
          });

          console.log(this.allProducts)
        }
        else {
          loading.dismiss();
          this.newProducts = result.latest_products;
        }
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  updateCart(product, type) {
    if (type == 'add') {
      if (this.cartProducts.find(x => x.id === product.id)) {
        let i = this.cartProducts.map(function (e) { return e.id; }).indexOf(product.id);;
        product.cartQuantity = product.cartQuantity + 1;
        this.cartProducts.splice(i, 1, product);
      }
      else {
        product.cartQuantity = 1;
        this.cartProducts.push(product);
      }
      this.showAddToCart = false;

      product.hoverAdded = 'hover';
      setTimeout(() => {
        product.hoverAdded = '';
      }, 800);

    }
    else {
      product.cartQuantity = product.cartQuantity > 0 ? product.cartQuantity - 1 : 0;
      if (this.cartProducts.indexOf(product) > -1 && product.cartQuantity == 1) {
        this.cartProducts.splice(product);
      }
      else {

      }

      this.showAddToCart = true;
    }
    window.localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
  }

  async openFilter() {
    const modal = await this.modalCtrl.create({
      component: FiltersPage,
      cssClass: 'my-custom-class',
    });

    modal.onDidDismiss()
      .then((data) => {

      });
    return await modal.present();
  }

  async openSort() {
    const modal = await this.modalCtrl.create({
      component: SortingPage,
      cssClass: 'my-custom-class',
    });

    modal.onDidDismiss()
      .then((data) => {

      });
    return await modal.present();
  }

  cart() {
    this.router.navigate(['/cart']);
  }

}
