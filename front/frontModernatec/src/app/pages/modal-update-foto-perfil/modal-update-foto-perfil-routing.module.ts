import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalUpdateFotoPerfilPage } from './modal-update-foto-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: ModalUpdateFotoPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalUpdateFotoPerfilPageRoutingModule {}
