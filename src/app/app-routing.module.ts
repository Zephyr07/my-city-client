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
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'delivery-address',
    loadChildren: () => import('./pages/delivery-address/delivery-address.module').then( m => m.DeliveryAddressPageModule)
  },
  {
    path: 'billing-address',
    loadChildren: () => import('./pages/billing-address/billing-address.module').then( m => m.BillingAddressPageModule)
  },
  {
    path: 'delivery-options',
    loadChildren: () => import('./pages/delivery-options/delivery-options.module').then( m => m.DeliveryOptionsPageModule)
  },
  {
    path: 'place-order',
    loadChildren: () => import('./pages/place-order/place-order.module').then( m => m.PlaceOrderPageModule)
  },
  {
    path: 'order-status',
    loadChildren: () => import('./pages/order-status/order-status.module').then( m => m.OrderStatusPageModule)
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
    path: 'add-new-address',
    loadChildren: () => import('./pages/add-new-address/add-new-address.module').then( m => m.AddNewAddressPageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'filters',
    loadChildren: () => import('./pages/filters/filters.module').then( m => m.FiltersPageModule)
  },
  {
    path: 'order-detail',
    loadChildren: () => import('./pages/order-detail/order-detail.module').then( m => m.OrderDetailPageModule)
  },
  {
    path: 'orders-listing',
    loadChildren: () => import('./pages/orders-listing/orders-listing.module').then( m => m.OrdersListingPageModule)
  },
  {
    path: 'products-listing',
    loadChildren: () => import('./pages/products-listing/products-listing.module').then( m => m.ProductsListingPageModule)
  },
  {
    path: 'product-detail',
    loadChildren: () => import('./pages/product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'sorting',
    loadChildren: () => import('./pages/sorting/sorting.module').then( m => m.SortingPageModule)
  },
  {
    path: 'select-location',
    loadChildren: () => import('./pages/select-location/select-location.module').then( m => m.SelectLocationPageModule)
  },
  {
    path: 'iniscreen',
    loadChildren: () => import('./pages/iniscreen/iniscreen.module').then( m => m.IniscreenPageModule)
  },
  {
    path: 'search-location',
    loadChildren: () => import('./pages/search-location/search-location.module').then( m => m.SearchLocationPageModule)
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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
