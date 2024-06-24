import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { CreateProductComponent } from './create-product/create-product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      { path: 'list', component: ProductsListComponent },
      { path: 'create', component: CreateProductComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
