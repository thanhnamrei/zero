import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'manager',
    loadChildren: () =>
      import('./features/manager/manager-routing.module').then(
        (m) => m.ManagerRoutingModule
      ),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./features/product/product-routing.module').then(
        (m) => m.ProductRoutingModule
      ),
  },
  {
    path: 'brand',
    loadChildren: () =>
      import('./features/brand/brand-routing.module').then(
        (m) => m.BrandRoutingModule
      ),
  },
];
