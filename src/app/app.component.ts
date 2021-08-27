import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ApiService } from './services/api.service';
import { Router, NavigationExtras } from '@angular/router';
import {ApiProvider} from './providers/api/api';
import {AuthProvider} from './providers/auth/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  private isUserEnabled = false;
  private isCatMenu = true;
  private categories: any;
  private client = {
    nom: ''
  };

  public appPages = [
    {
      title: 'Acceuil',
      url: '/dashboard',
      icon: 'home-outline'
    },
    {
      title: 'Mon compte',
      url: '/profile',
      icon: 'person-outline'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private apiService: ApiService,
    private auth: AuthProvider,
    private api: ApiProvider,
    private menuCtrl: MenuController,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#e67e22');
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    this.getCategories();
    // Recuperation du client
    this.auth.getContext().then((d: any) => {
      this.client = JSON.parse(d).clients;
    }, e => {
      console.log(e);
    });
  }

  profile(){
    if (this.isCatMenu || !this.isCatMenu)
   {this.isCatMenu = !this.isCatMenu; }
  }

  getCategories(){
    const opt = {
      parent_id: 999999999,
      should_paginate: false,
      _sort: 'nom',
      _sortDir: 'asc'
    };
    this.api.Categories.getList(opt).subscribe((d: any) => {
      this.categories = d;
    }, err => {
        console.log(err);
    });
  }

  toggleButton(){
    this.isUserEnabled = !this.isUserEnabled;
  }

   openCategories(subPage){
     this.menuCtrl.close();
     const  navigationExtra: NavigationExtras = { state: {id: subPage.id, nom: subPage.nom}};
     this.router.navigate(['categories-listing'], navigationExtra);
   }

   home(){
    this.router.navigate(['/dashboard']);
    this.menuCtrl.close();
   }

   logout(){
    this.auth.logout().then(d => {
      this.router.navigate(['/iniscreen'], { replaceUrl: true });
    });
   }

}
