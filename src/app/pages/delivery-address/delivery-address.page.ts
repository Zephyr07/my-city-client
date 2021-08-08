import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.page.html',
  styleUrls: ['./delivery-address.page.scss'],
})
export class DeliveryAddressPage implements OnInit {
  private addresses: any = [];
  private totalCartAmount: any;
  addressDATA: any;
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.getAddress();
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.totalCartAmount = Number(window.localStorage.getItem('cartAmount'));
    var ad = window.localStorage.getItem('data');
    if (ad != null || ad != undefined) {
      this.addressDATA = JSON.parse(ad);
      window.localStorage.removeItem('data');
      this.addresses.push(this.addressDATA);
    }
  }

  getAddress() {
    this.apiService.getPaymentAddress().then((result: any) => {
      this.addresses = result.data.addresses;
    })
  }

  goToBillingAddress() {
    this.router.navigate(['/billing-address']);
  }

}
