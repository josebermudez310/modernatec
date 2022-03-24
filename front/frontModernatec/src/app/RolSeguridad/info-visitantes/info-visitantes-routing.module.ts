import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoVisitantesPage } from './info-visitantes.page';

const routes: Routes = [
  {
    path: '',
    component: InfoVisitantesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoVisitantesPageRoutingModule {}
