import { Component, OnInit } from '@angular/core';
import { DataService } from "../../services/data.service";
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  private searchTerm: string = '';
  private searchControl: FormControl;
  private items: any;
  private searching: any = false;
  private categories: any = [];
  private searchCategory: any = [];
  constructor(
    private dataService: DataService,
    private modalCtrl: ModalController,
    private apiService: ApiService,
    private router: Router
  ) {
    this.searchControl = new FormControl();
    this.getCategoriesData();
  }

  ngOnInit() {
    this.setFilteredItems();
    this.searchControl.valueChanges
      .pipe(debounceTime(800))
      .subscribe(search => {
        this.searchTerm = search;
        this.searching = false;
        this.setFilteredItems();
      })
  }

  onSearchInput() {
    this.searching = true;
  }

  setFilteredItems() {
    this.searchCategory = this.dataService.filterItems(this.searchTerm);
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  getCategoriesData() {
    this.apiService.getCategories()
      .then((result: any) => {
        this.categories = result.data;
      }, err => {
        console.log(err);
      });
  }

  goToProducts(product) {
    this.dismiss();
    let navigationExtra: NavigationExtras = { state: { category: { title: product.title, total: product.total } } }
    this.router.navigate(['products-listing'], navigationExtra);
  }

}
