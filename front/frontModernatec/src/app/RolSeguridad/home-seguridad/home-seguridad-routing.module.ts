import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeSeguridadPage } from './home-seguridad.page';

const routes: Routes = [
  {
    path: '',
    component: HomeSeguridadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeSeguridadPageRoutingModule {}
