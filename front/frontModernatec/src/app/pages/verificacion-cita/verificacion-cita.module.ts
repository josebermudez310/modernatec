import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificacionCitaPageRoutingModule } from './verificacion-cita-routing.module';

import { VerificacionCitaPage } from './verificacion-cita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    VerificacionCitaPageRoutingModule
  ],
  declarations: [VerificacionCitaPage]
})
export class VerificacionCitaPageModule {}
