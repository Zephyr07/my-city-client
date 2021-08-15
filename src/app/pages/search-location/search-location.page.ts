import { Component, OnInit, NgZone } from '@angular/core';
import { ModalController } from '@ionic/angular';

declare let google: any;

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.page.html',
  styleUrls: ['./search-location.page.scss'],
})

export class SearchLocationPage implements OnInit {
  private autocompleteItems: any = [];
  private autocomplete: any = {};
  private searching: any = false;
  latitude: number = 0;
  longitude: number = 0;
  geo: any

  GoogleAutocomplete = new google.maps.places.AutocompleteService();
  constructor(
    private zone: NgZone,
    private modalController: ModalController
  ) {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }

  chooseItem(item: any) {
    this.modalController.dismiss(item);
  }

  updateSearchResults() {
    this.searching = true;
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      this.searching = false;
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({
      input: this.autocomplete.query,
      componentRestrictions: {
        country: 'camroon'
      }
    },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          if (predictions != null) {
            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction.description);
              this.searching = false;
            });
          }
        });
      });
  }

}
