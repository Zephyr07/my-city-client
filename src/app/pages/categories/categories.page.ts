import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import {MenuController, ModalController} from '@ionic/angular';
import {ApiProvider} from "../../providers/api/api";
import {Router} from "@angular/router";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  private categories: any = [];
  private selectedMenu = 0;
  constructor(
    private api: ApiProvider,
    private modalCtrl: ModalController,
    private router: Router,
    private menuCtrl: MenuController
  ) {
    this.getCategories();
  }

  ngOnInit() {
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

    openPage(page, index) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        if (page.component) {

            this.router.navigate(page.component);
            this.menuCtrl.close();
        } else {
            if (this.selectedMenu === index) {
                this.selectedMenu = -1;

            } else {
                this.selectedMenu = index;

            }
        }
    }

  dismiss(category) {
    this.modalCtrl.dismiss({
      dismissed: true
    }, category);
  }




}
