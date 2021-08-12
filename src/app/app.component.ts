import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ApiService } from './services/api.service';
import { Router, NavigationExtras } from '@angular/router';
import {ApiProvider} from "./providers/api/api";
import {AuthProvider} from "./providers/auth/auth";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  private isUserEnabled:boolean = false;
  private isCatMenu:boolean=true;
  private categories:any;
  private client = {
    nom: ''
  };
  private selectedMenu: any;

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

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

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
    this.auth.getContext().then(d => {
      this.client = JSON.parse(d).clients;
    }, e => {
      console.log(e);
    });
  }

  profile(){
    if(this.isCatMenu || !this.isCatMenu)
   {this.isCatMenu=!this.isCatMenu;}
  }

  getCategories(){
    const opt = {
      should_paginate: false,
      _sort: 'nom',
      _sortDir: 'asc',
      _includes: 'sous_categories'
    };

    this.api.Categories.getList(opt).subscribe(d => {
      this.categories = d;
    }, err => {
        console.log(err);
    });
  }

  toggleButton(){
    this.isUserEnabled = !this.isUserEnabled;
  }

  openPage(page, index) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.component) {
     
      this.router.navigate(page.component);
      this.menuCtrl.close();
    } else {
      if (this.selectedMenu==index) {
        this.selectedMenu = -1;
       
      } else {
        this.selectedMenu = index;
       
      }
    }
  }
   openSubPage(subPage){
     this.menuCtrl.close();
     const  navigationExtra: NavigationExtras = { state: {sous_categories: subPage}};
     this.router.navigate(['offre-listing'], navigationExtra);
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
