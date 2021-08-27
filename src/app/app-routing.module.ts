import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'iniscreen',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./pages/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'iniscreen',
    loadChildren: () => import('./pages/iniscreen/iniscreen.module').then( m => m.IniscreenPageModule)
  },
  {
    path: 'entreprise-listing',
    loadChildren: () => import('./pages/entreprise-listing/entreprise-listing.module').then( m => m.EntrepriseListingPageModule)
  },
  {
    path: 'type-entreprises',
    loadChildren: () => import('./pages/type-entreprises/type-entreprises.module').then( m => m.TypeEntreprisesPageModule)
  },
  {
    path: 'offre-listing',
    loadChildren: () => import('./pages/offre-listing/offre-listing.module').then( m => m.OffreListingPageModule)
  },
  {
    path: 'offre-detail',
    loadChildren: () => import('./pages/offre-detail/offre-detail.module').then( m => m.OffreDetailPageModule)
  },
  {
    path: 'offre-prix',
    loadChildren: () => import('./pages/offre-prix/offre-prix.module').then( m => m.OffrePrixPageModule)
  },
  {
    path: 'entreprise-detail',
    loadChildren: () => import('./pages/entreprise-detail/entreprise-detail.module').then( m => m.EntrepriseDetailPageModule)
  },
  {
    path: 'promotion-listing',
    loadChildren: () => import('./pages/promotion-listing/promotion-listing.module').then( m => m.PromotionListingPageModule)
  },
  {
    path: 'abonnement',
    loadChildren: () => import('./pages/abonnement/abonnement.module').then( m => m.AbonnementPageModule)
  },
  {
    path: 'marques-listing',
    loadChildren: () => import('./pages/marques-listing/marques-listing.module').then( m => m.MarquesListingPageModule)
  },
  {
    path: 'categories-listing',
    loadChildren: () => import('./pages/categories-listing/categories-listing.module').then( m => m.CategoriesListingPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
