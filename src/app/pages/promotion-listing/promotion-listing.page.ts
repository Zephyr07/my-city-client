import { Component, OnInit } from '@angular/core';
import {ApiProvider} from '../../providers/api/api';
import {LoadingController} from '@ionic/angular';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-promotion-listing',
  templateUrl: './promotion-listing.page.html',
  styleUrls: ['./promotion-listing.page.scss'],
})
export class PromotionListingPage implements OnInit {

    private oldPromotions: any = [];
    private promotions: any = [];
    private activeTab: any;
    constructor(
        private api: ApiProvider,
        private loadingCtrl: LoadingController
    ) {

        this.activeTab = 'all';
        this.getPromotions();

    }


    ngOnInit() {
    }


    tabChanged(ev) {
        this.activeTab = ev.detail.value;
        if (this.activeTab === 'all') {
            this.promotions = this.oldPromotions;
        } else {
            this.promotions = _.orderBy(this.promotions, 'created_at').reverse();
        }
    }

    async getPromotions() {
        const loading = await this.loadingCtrl.create({
            message: 'Chargement...'
        });
        loading.present();

        const opt = {
            should_paginate: false,
            _includes: 'entreprises',
            _sort: 'created_at',
            _sortDir: 'asc',
            statut : 'active'
        };
        this.api.Promotions.getList(opt).subscribe( d => {
            // classement des notes
            this.oldPromotions = d;
            this.promotions = d;
            loading.dismiss();
        }, q => {
            console.log('erreur chargement', q);
            loading.dismiss();
        });
    }

}
