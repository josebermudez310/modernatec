import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalUpdateFotoPerfilPageRoutingModule } from './modal-update-foto-perfil-routing.module';

import { ModalUpdateFotoPerfilPage } from './modal-update-foto-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalUpdateFotoPerfilPageRoutingModule
  ],
  declarations: [ModalUpdateFotoPerfilPage]
})
export class ModalUpdateFotoPerfilPageModule {}
