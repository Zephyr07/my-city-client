import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { SearchLocationPage } from '../search-location/search-location.page';
import { ModalController, Platform, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;
@Component({
  selector: 'app-select-location',
  templateUrl: './select-location.page.html',
  styleUrls: ['./select-location.page.scss'],
})
export class SelectLocationPage implements OnInit {
  private locationResult: any;
  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private apiService: ApiService,
    private geolocation: Geolocation,
    public nativeGeocoder: NativeGeocoder,
    private zone: NgZone
  ) {
  }

  ngOnInit() {
  }

  async onFindLocation() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading Location ...'
    });
    loading.present();

    this.geolocation.getCurrentPosition().then((resp) => {
      const pos = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      };

      this.reverseGeocode(pos.lat, pos.lng);

    }).catch((error) => {
      console.log('Error getting location', error);
      loading.dismiss();
    });

  }


  reverseGeocode(lat, lng) {
    if (this.platform.is('cordova')) {
      let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
      };
      this.nativeGeocoder.reverseGeocode(lat,lng, options)
        .then((result: NativeGeocoderResult[]) => {
          let address = result[0];
          console.log('address', address);
          let subLocality = address.subLocality!='' ? (address.subLocality + (address.locality !='' ?', ':'')) : '';
          let locality = address.locality!='' ? (address.locality + (address.administrativeArea!='' ? ', ': '')) : '';
          let administrativeArea = address.administrativeArea!='' ? (address.administrativeArea + (address.postalCode ? '- ':'')) : '';
          let postalCode = address.postalCode!='' ? (address.postalCode + (address.countryName ? ', ':'')) : '';
          let countryName = address.countryName!='' ? address.countryName: '';
          this.locationResult = subLocality + locality + administrativeArea + postalCode + countryName;
          this.loadingCtrl.dismiss();
          setTimeout(() => {
            this.router.navigate(['/dashboard'], { replaceUrl: true });
          }, 1000);
        })
        .catch((error: any) => {
          console.log(error)
          this.loadingCtrl.dismiss();
        });
    } else {
      this.getGeoLocation(lat, lng, 'reverseGeocode');
    }
  }
  async getGeoLocation(lat: number, lng: number, type?) {
    if (navigator.geolocation) {
      let geocoder = await new google.maps.Geocoder();
      let latlng = await new google.maps.LatLng(lat, lng);
      let request = { latLng: latlng };
      await geocoder.geocode(request, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          let result = results[0];
          this.zone.run(() => {
            if (result != null) {
              this.locationResult = result.formatted_address;
              this.loadingCtrl.dismiss();
              setTimeout(() => {
                this.router.navigate(['/dashboard'], { replaceUrl: true });
              }, 1000);
            }
            else {
              this.locationResult = '';
            }
          })
        }
      });
    }
  }


  async onAddressModal() {
    const modal = await this.modalCtrl.create({
      component: SearchLocationPage,
      cssClass: 'my-custom-class',
    });

    modal.onDidDismiss()
      .then((data) => {
        console.log(data);
        if (data['data'] != undefined) {
          this.locationResult = data['data'];

          setTimeout(() => {
            this.router.navigateByUrl('/dashboard', { replaceUrl: true });
          }, 1000);
        }

      });
    return await modal.present();
  }
}
