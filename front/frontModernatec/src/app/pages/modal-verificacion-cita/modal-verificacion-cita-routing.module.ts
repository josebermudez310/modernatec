import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalVerificacionCitaPage } from './modal-verificacion-cita.page';

const routes: Routes = [
  {
    path: '',
    component: ModalVerificacionCitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalVerificacionCitaPageRoutingModule {}
