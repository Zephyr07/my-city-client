import {Injectable} from '@angular/core';
import {ApiProvider} from '../api/api';
import * as _ from 'lodash';
import {NgxPermissionsService, NgxRolesService} from 'ngx-permissions';
declare var Metro;
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  public token: string;
  public token_key = 'jwt_token';

  constructor(public api: ApiProvider, private permissionsService: NgxPermissionsService, private rolesService: NgxRolesService) {
    this.token = localStorage.getItem(this.token_key);
  }

  isLogged(): boolean {
    // console.log("z");
    return localStorage.getItem(this.token_key) != undefined;
  }

  login(credentials: {email: string, password: string}) {
    return new Promise((resolve, reject) => {
      this.api.restangular.all('auth/signin').post(credentials)
        .subscribe( (response) => {
          const data = response.body;
          this.storeSession(response.body);
          resolve(data);
        }, error => {
          reject(error);
        });
    });

  }
  register(credentials: {email: string, password: string, password_confirmation: string, nom: string, telephone: number, genre: string}) {
    return new Promise((resolve, reject) => {
      this.api.restangular.all('auth/signup').post(credentials)
        .subscribe( (response) => {
          console.log(response);
          const data = response.body;
          localStorage.setItem(this.token_key, data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('client', JSON.stringify(data.client));

          resolve(data);
        },  error => {
          // console.log(error);

          reject(error);
        });
    });

  }

  /*save_tokezn(user) {

    return new Promise((resolve, reject) => {
      this.notif.getDeviceToken().then((token) => {
        if (Array.isArray(user.device_tokens)) {
          if (_.indexOf(user.device_tokens, token) < 0) {
            user.device_tokens.push(token);
          }
        } else {
          user.device_tokens = [token];
        }
        this.update_info(user);
        resolve(user);
      }, (err) => {
        reject(err);
        console.log(err);
      });
    });

  }*/

  update_info(credentials: {
    id: number, first_name?: string, last_name?: string, phone?: string, email?: string,
    password: string, device_tokens?: string[]
  }) {
    return new Promise((resolve, reject) => {
      this.api.restangular.all('auth/update_info').post(credentials)
        .subscribe((response) => {
          const data = response.body.data;
          localStorage.setItem(this.token_key, data.token);
          localStorage.setItem('user', data.user);

          resolve(data);
        }, error => {
          // console.log(error);

          reject(error);
        });
    });

  }

  logout() {
    return   new Promise((resolve, reject) => {
      localStorage.removeItem(this.token_key);
      localStorage.removeItem('user');
      localStorage.removeItem('client');
      resolve(true);
      // AclService.flushRoles();
      // AclService.setAbilities({});
    });
  }

  getContext() {
    return   new Promise((resolve, reject) => {
      if (this.isLogged()) {
        resolve(localStorage.getItem('user'));

      } else {
        reject('not logged');
      }
    });
  }

  loadPermissions() {
    this.api.me.get().subscribe((data) => {
      this.storeSession(data.body.data);
    }, q => {
      if (q.data.status_code === 500) {
        Metro.notify.create('loadPermissions ' + JSON.stringify(q.data.error.message), 'Erreur ' + q.data.status_code, {cls: 'alert', keepOpen: true, width: 500});
      } else if (q.data.status_code === 401) {

      } else {
        Metro.notify.create('loadPermissions ' + JSON.stringify(q.data.error.errors), 'Erreur ' + q.data.status_code, {cls: 'alert', keepOpen: true, width: 500});
      }
    });

  }
  private storeSession(data: any) {
    localStorage.setItem(this.token_key, data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
   }
}
