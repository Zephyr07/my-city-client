import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  private data: any;
  private cartProducts: any = [];
  private badge: boolean = false;
  private showAddToCart: boolean = true;
  constructor(
    public router: Router,
    private apiService: ApiService
  ) {

  }

  async getProductDetail() {

  }

  async ionViewWillEnter() {
    this.apiService.getProductDetail().then(async (result: any) => {
      this.data = await result.data;
      this.cartProducts = window.localStorage.getItem('cartProducts') ? JSON.parse(window.localStorage.getItem('cartProducts')) : [];
      if (this.cartProducts && this.cartProducts.find(x => x.id === this.data.id)) {
        this.showAddToCart = false;
      }
      else {
        this.showAddToCart = true;
      }
    });

  }

  ngOnInit() {

  }

  cart() {
    this.router.navigate(['/cart']);
  }

  updateCart(product, type) {
    if (type == 'add') {
      product.cartQuantity = 1;
      this.cartProducts.push(product);
      this.showAddToCart = false;
    }
    else {
      product.cartQuantity = 0;
      let index = this.cartProducts.indexOf(product);
      this.cartProducts.splice(index, 1);
      this.showAddToCart = true;
    }
    window.localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
  }

}
