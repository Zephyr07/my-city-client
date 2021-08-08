import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ApiProvider} from '../../providers/api/api';

@Component({
  selector: 'app-type-entreprises',
  templateUrl: './type-entreprises.page.html',
  styleUrls: ['./type-entreprises.page.scss'],
})
export class TypeEntreprisesPage implements OnInit {

    private typeEntreprises: any = [];

    constructor(
        private api: ApiProvider,
        private modalCtrl: ModalController
    ) {
        this.getTypeEntrerpisesData();
    }

    ngOnInit() {
    }

    getTypeEntrerpisesData() {
      const opt = {
          _sort: 'nom',
          _sortDir: 'asc',
      }
      this.api.TypeEntreprises.getList(opt).subscribe(d => {
          this.typeEntreprises = d;
      }, err => {
          console.log(err);
      });
    }

    dismiss(category) {
        this.modalCtrl.dismiss({
            dismissed: true
        }, category);
    }
}