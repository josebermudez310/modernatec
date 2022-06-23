import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalVerificacionCitaPageRoutingModule } from './modal-verificacion-cita-routing.module';

import { ModalVerificacionCitaPage } from './modal-verificacion-cita.page';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    PipesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ModalVerificacionCitaPageRoutingModule
  ],
  declarations: [ModalVerificacionCitaPage]
})
export class ModalVerificacionCitaPageModule {}
