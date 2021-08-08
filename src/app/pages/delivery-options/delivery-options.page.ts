import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-options',
  templateUrl: './delivery-options.page.html',
  styleUrls: ['./delivery-options.page.scss'],
})
export class DeliveryOptionsPage implements OnInit {
  private method1: any;
  private method2: any;
  private todayDate: any;
  private totalCartAmount: any;
  private totalAmount: any;
  private shippingCharge: any = 50;
  maxYear: any;
  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    this.getShippingMethods();
    this.todayDate = new Date().toISOString();
    var dt = new Date().getDate() + 1;
    this.todayDate = new Date(new Date().getFullYear(), new Date().getMonth(), dt).toISOString();
    this.maxYear = new Date().getFullYear() + 1;
    console.log(this.todayDate);
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.totalCartAmount = Number(window.localStorage.getItem('cartAmount'));
    this.shippingCharge = Number(this.shippingCharge);
    this.totalAmount = this.totalCartAmount + this.shippingCharge;
    window.localStorage.setItem('shippingCharge', this.shippingCharge);
  }

  shippingMethod(method) {
    this.shippingCharge = Number(method.detail.value);
    this.totalAmount = this.totalCartAmount + this.shippingCharge;
    window.localStorage.setItem('shippingCharge', this.shippingCharge);

  }

  getShippingMethods() {
    this.apiService.getShippingMethods().then((result: any) => {
      let methods = result.shipping_methods;
      this.method1 = methods.extendfree.quote.extendfree;
      this.method2 = methods.pickup.quote.pickup;
    })
  }

  continue() {
    this.router.navigate(['place-order']);
  }

}
