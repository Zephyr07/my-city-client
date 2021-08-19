import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {ApiProvider} from "../../providers/api/api";

@Component({
  selector: 'app-entreprise-detail',
  templateUrl: './entreprise-detail.page.html',
  styleUrls: ['./entreprise-detail.page.scss'],
})
export class EntrepriseDetailPage implements OnInit {

    private prix: any;
    private entreprise: any;
    constructor(
        public route: ActivatedRoute,
        public router: Router,
        private api: ApiProvider
    ) {
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                const entreprise = this.router.getCurrentNavigation().extras.state.entreprise;
                this.getEntrepriseById(entreprise.id);
            } else {
                this.getEntrepriseById(8);
                console.log('aucune données');
            }
        });

    }

    async getEntrepriseById(id) {
      const opt = {
        _includes : 'localisations.villes,prix_offres.offres,type_entreprises,note_entreprises.notes'
      };
      this.api.Entreprises.get(id, opt).subscribe(d => {
        const data = d.body;
        let sumNote = 0;
        data.notes = 0;
        data.note_entreprises.forEach(v => {
            if (v.notes.valeur === undefined) {
                v.notes.valeur = 0;
            }
            sumNote += v.notes.valeur;
        });
        if (data.note_entreprises.length !== 0) {
            data.notes = sumNote / data.note_entreprises.length;
        }
        this.entreprise = data;
      });
    }


    ngOnInit() {

    }

    async openOffreDetail(p) {
      p.entreprises = this.entreprise;
      const navigationExtra: NavigationExtras = {state: {offre: {offre_id: p.offres.id, prix: p}}};
      this.router.navigateByUrl('offre-detail', navigationExtra);
    }
}
