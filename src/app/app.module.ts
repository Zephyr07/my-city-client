import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NativeGeocoder} from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import * as _ from 'lodash';
import {API_ENDPOINT} from './services/contants';
import {RestangularModule} from 'ngx-restangular';
import {ApiProvider} from './providers/api/api';
import {PriceFormatPipe} from "./pipe/price-format";
import {StatutPipe} from "./pipe/status";
import {FilterPipe} from "./pipe/filter.pipe";
import {LimitToPipe} from "./pipe/limit-to";
import {AuthProvider} from "./providers/auth/auth";
import {NgxPermissionsModule} from "ngx-permissions";

export function RestangularConfigFactory(RestangularProvider) {
    RestangularProvider
      .setBaseUrl(API_ENDPOINT)
      .addResponseInterceptor((data, operation, what, url, response, deferred) => {

            if (operation === 'getList') {

                let newResponse = what;
                if (Array.isArray(data)) {

                    // newResponse = response.data[what]
                    // newResponse.error = response.error
                    return data;
                }
                if (data.per_page !== undefined) {
                    newResponse = data.data;
                    newResponse.metadata = _.omit(data, 'data');
                    return newResponse;
                }
                return [{value: data}];


            }

            return response;
        })
        .addFullRequestInterceptor((element, operation, path, url, headers, params) => {
            /*console.log('element',element);
            console.log('operation',operation);
            console.log('what',what);
            console.log('url',url);
            console.log('headers',headers);
            console.log('params',params);*/

            const token = localStorage.getItem('jwt_token');
            if (token) {
                headers.Authorization = 'Bearer ' + token;
                headers['Access-Token'] = token;
            }
        })
    ;
}

@NgModule({
  declarations: [
      AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({mode: 'ios'}),
    RestangularModule.forRoot(RestangularConfigFactory),
    NgxPermissionsModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeGeocoder,
    ApiProvider,
    AuthProvider,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
