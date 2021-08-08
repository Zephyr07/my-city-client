import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiProvider} from '../../providers/api/api';

@Component({
  selector: 'app-offre-detail',
  templateUrl: './offre-detail.page.html',
  styleUrls: ['./offre-detail.page.scss'],
})
export class OffreDetailPage implements OnInit {

    private prix: any;
    private offre: any;
    constructor(
        public route: ActivatedRoute,
        public router: Router,
        private api: ApiProvider
    ) {
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                const offre = this.router.getCurrentNavigation().extras.state.offre;
                this.prix = offre.prix;
                this.getOffreById(offre.offre_id);
            } else {
                this.getOffreById(1);
                console.log('aucune données');
            }
        });

    }

    async getOffreById(id) {
        this.api.Offres.get(id).subscribe(d => {
            console.log(d);
            this.offre = d.body;
        });
    }

    ngOnInit() {

    }

}
