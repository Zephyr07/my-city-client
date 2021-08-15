import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';
import {Router} from '@angular/router';
declare var Metro;
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class ApiProvider {

  public Abonnements: any = this.restangular.service('abonnements');
  public Categories: any = this.restangular.service('categories');
  public Clients: any = this.restangular.service('clients');
  public Entreprises: any = this.restangular.service('entreprises');
  public Marques: any = this.restangular.service('marques');
  public Offres: any = this.restangular.service('offres');
  public Paiements: any = this.restangular.service('paiements');
  public Promotions: any = this.restangular.service('promotions');
  public SousCategories: any = this.restangular.service('sous_categories');
  public TypeAbonnements: any = this.restangular.service('type_abonnements');
  public TypeEntreprises: any = this.restangular.service('type_entreprises');
  public Villes: any = this.restangular.service('villes');
  public me: any = this.restangular.one('auth/me');
  public BuyTicketUrl: any = this.restangular.service('buy_ticket/get_om_url');

  public date_format = 'Y-M-D';

  public autoplay_val = 5000;
  public slide_speed = 700;

  constructor(public restangular: Restangular, private router: Router) {
    restangular.withConfig((RestangularConfigurer) => {});
  }

  formarPrice(price) {
    if (price === undefined) {
      return '';
    } else {
      price += '';
      const tab = price.split('');
      let p = '';
      for (let i = tab.length; i > 0; i--) {
        if (i % 3 === 0) {
          p += ' ';
        }
        p += tab[tab.length - i];
      }
      return p;
    }
  }

  checkUser() {
    if (JSON.parse(localStorage.getItem('user')) == null) {
      Metro.notify.create('Vous n\'êtes pas connecté', 'Erreur de connexion', {cls: 'alert'});
      this.router.navigate(['/login']);
    } else {
      // rien
      // verification si le mot de passe a été reset
      if (!JSON.parse(localStorage.getItem('user')).has_reset_password) {
        this.router.navigate(['/reset', JSON.parse(localStorage.getItem('user')).id]);
      }
    }
  }
}
