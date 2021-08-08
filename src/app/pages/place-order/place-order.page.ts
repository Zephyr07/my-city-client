import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.page.html',
  styleUrls: ['./place-order.page.scss'],
})
export class PlaceOrderPage implements OnInit {
  private method1: any;
  private method2: any;
  private totalAmount: number;
  private totalCartAmount: number;
  private shippingCharge: number;
  private cartValue: any
  constructor(
    private apiService: ApiService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.getPaymentMethods();
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.totalCartAmount = Number(window.localStorage.getItem('cartAmount'));
    this.shippingCharge = Number(window.localStorage.getItem('shippingCharge'));
    this.totalAmount = this.shippingCharge + this.totalCartAmount;
  }

  getPaymentMethods() {
    this.apiService.getPaymentMethods().then((result: any) => {
      let methods = result.payment_methods;
      this.method1 = methods.cod;
      this.method2 = methods.payu;
    })
  }

  async placeOrder() {
    if (this.totalCartAmount > 0) {
      this.router.navigateByUrl('order-status');
      window.localStorage.clear();
    }
    else {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        message: 'There is no product in the cart',
        buttons: ['OK']
      });

      await alert.present();
    }


  }

  async applyCoupon() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: 'Coupon Invalid!',
      buttons: ['OK']
    });

    await alert.present();
  }

}
