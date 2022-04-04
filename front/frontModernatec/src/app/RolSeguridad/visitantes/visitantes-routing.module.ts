import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitantesPage } from './visitantes.page';

const routes: Routes = [
  {
    path: '',
    component: VisitantesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitantesPageRoutingModule {}
