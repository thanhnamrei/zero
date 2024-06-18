import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { ManagerComponent } from './manager.component';

const routes: Routes = [
  {
    path: '',
    component: ManagerComponent,
    children: [
      { path: 'home', component: ManagerHomeComponent },
      // { path: 'home', component: ManagerHomeComponent },
      // { path: 'home', component: ManagerHomeComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
