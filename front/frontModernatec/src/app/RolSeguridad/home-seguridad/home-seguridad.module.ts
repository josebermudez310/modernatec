import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeSeguridadPageRoutingModule } from './home-seguridad-routing.module';

import { HomeSeguridadPage } from './home-seguridad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeSeguridadPageRoutingModule
  ],
  declarations: [HomeSeguridadPage]
})
export class HomeSeguridadPageModule {}
