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
        this.api.Offres.get(id, {_includes: 'note_offres.notes,marques'}).subscribe(d => {
            const data = d.body;
            let sumNote = 0;
            data.note_offres.forEach(v => {
                if (v.notes.valeur === undefined) {
                    v.notes.valeur = 0;
                }
                sumNote += v.notes.valeur;
            });
            if (data.note_offres.length !== 0) {
                data.notes = sumNote / data.note_offres.length;
            }
            this.offre = data;
        });
    }

    ngOnInit() {

    }

}
