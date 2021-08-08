import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ModalController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.page.html',
  styleUrls: ['./filters.page.scss'],
})
export class FiltersPage implements OnInit {
  private brandFilter: any = [];
  private discountFilter: any = [];
  private priceFilter: any = [];
  private activeSegment: any;
  constructor(
    private apiService: ApiService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController
  ) {
    this.getFilters();
    this.activeSegment = 'brand';
  }

  ngOnInit() {
  }

  async getFilters() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...'
    });
    loading.present();
    this.apiService.getFilter().then((result: any) => {
      loading.dismiss();
      this.brandFilter = result.brands_filter;
      this.discountFilter = result.discountfilter;
      this.priceFilter = result.pricefilter;
    })
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
