import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './brand.component';
import { CreateBrandComponent } from './create-brand/create-brand.component';
import { BrandsListComponent } from './brands-list/brands-list.component';

const routes: Routes = [
  {
    path: '',
    component: BrandComponent,
    children: [
      { path: 'create', component: CreateBrandComponent },
      { path: 'list', component: BrandsListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrandRoutingModule {}
