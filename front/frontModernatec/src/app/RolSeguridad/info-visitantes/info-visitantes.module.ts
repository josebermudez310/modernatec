import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoVisitantesPageRoutingModule } from './info-visitantes-routing.module';

import { InfoVisitantesPage } from './info-visitantes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoVisitantesPageRoutingModule
  ],
  declarations: [InfoVisitantesPage]
})
export class InfoVisitantesPageModule {}
