import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificacionCitaPage } from './verificacion-cita.page';

const routes: Routes = [
  {
    path: '',
    component: VerificacionCitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificacionCitaPageRoutingModule {}
