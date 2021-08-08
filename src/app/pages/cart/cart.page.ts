import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  private cartProducts: any = [];
  private totalCartAmount: number = 0;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private alertController: AlertController
  ) {

  }

  ionViewWillEnter() {
    this.getCartItem();
  }

  ngOnInit() {
  }

  getCartItem() {
    this.cartProducts = window.localStorage.getItem('cartProducts') ? JSON.parse(window.localStorage.getItem('cartProducts')) : [];
    this.cartProducts.forEach(element => {
      if (element.cartQuantity == null) 
        element.cartQuantity = 1; 
      element.cartAmount = element.cartQuantity * parseInt(element.special);
      this.totalCartAmount = this.totalCartAmount + element.cartAmount;
    });
    window.localStorage.setItem('cartAmount', this.totalCartAmount.toString());
  }

  updateQty(product, type) {
    if (type == 'add') {
      product.cartQuantity = parseInt(product.cartQuantity) + 1;
      product.cartAmount = parseInt(product.special);
      this.totalCartAmount = this.totalCartAmount + product.cartAmount;
    }
    else {
      if (product.cartQuantity > 1) {
        product.cartQuantity = parseInt(product.cartQuantity) - 1;
        product.cartAmount = parseInt(product.special);
        this.totalCartAmount = this.totalCartAmount - product.cartAmount;
      }
      else
        this.messageAlert('Quantity can not be less than 1');
    }

    let i = this.cartProducts.map(function (e) { return e.id; }).indexOf(product.id);;
    this.cartProducts.splice(i, 1, product);
    window.localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
    window.localStorage.setItem('cartAmount', this.totalCartAmount.toString());

  }


  removeProduct(product) {
    let index = this.cartProducts.indexOf(product);
    this.cartProducts.splice(index, 1);
    product.cartAmount = product.cartQuantity * parseInt(product.special);
    this.totalCartAmount = this.totalCartAmount - product.cartAmount;
    window.localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
    window.localStorage.setItem('cartAmount', this.totalCartAmount.toString());
  }

  goToDeliveryAddress() {
    this.router.navigate(['/delivery-address']);
  }

  async messageAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }


}
