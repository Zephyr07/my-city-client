import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient) { }

  // Get DashBoard Banner
  getDashboardBanners() {
    return new Promise(resolve => {
      this.http.get('../../assets/data/dashboard/appbanners.json')
        .subscribe(res => resolve(res));
    });
  }

  //Get Product Detail
  getProductDetail() {
    return new Promise(resolve => {
      this.http.get('../../assets/data/product/detail.json')
        .subscribe(res => resolve(res));
    });
  }

  //Get Categories
  getCategories() {
    return new Promise(resolve => {
      this.http.get('../../assets/data/dashboard/multicategory.json')
        .subscribe(res => resolve(res));
    })
  }

  //Get Delivery and Billing Address
  getPaymentAddress() {
    return new Promise(resolve => {
      this.http.get('../../assets/data/product/paymentaddress.json')
        .subscribe(res => resolve(res));
    })
  }

  //Get Shipping Methods
  getShippingMethods() {
    return new Promise(resolve => {
      this.http.get('../../assets/data/product/cart/shippingmethods.json')
        .subscribe(res => resolve(res));
    })
  }

  //Get payment Methods
  getPaymentMethods() {
    return new Promise(resolve => {
      this.http.get('../../assets/data/product/cart/paymentmethods.json')
        .subscribe(res => resolve(res));
    })
  }

  //Get Filters
  getFilter() {
    return new Promise(resolve => {
      this.http.get('../../assets/data/product/filter.json')
        .subscribe(res => resolve(res));
    })
  }

  //Get Products
  getProductsName_ASC() {
    return new Promise(resolve => {
      this.http.get('../../assets/data/product/products1-5-1-ASC-name.json')
        .subscribe(res => resolve(res));
    })
  }

  //Get Countries
  getCountries() {
    return new Promise((resolve, reject) => {
      this.http.get('../../assets/data/user/countries.json')
        .subscribe(data => {
          resolve(data);
        }, err => {
          reject(err);
        });
    });
  }

}
