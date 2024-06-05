import { Routes } from '@angular/router';
import { ProductsListComponent } from './features/products/products-list/products-list.component';
import { CreateProductComponent } from './features/products/create-product/create-product.component';

export const routes: Routes = [
  { path: 'products-list', component: ProductsListComponent },
  { path: 'create-product', component: CreateProductComponent },
];