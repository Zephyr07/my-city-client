import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data=[];
  public searchCategory: any = [];
  constructor(
    private apiService: ApiService
  ) {
    this.getCategoriesData();
   }

  filterItems(searchTerm) {
    return this.searchCategory.filter(category => {
      return category.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  getCategoriesData(){
    this.apiService.getCategories()
    .then((result:any)=>{
          this.searchCategory = result.data;
      }, err=> {
        console.log(err);
      });
  }


}
