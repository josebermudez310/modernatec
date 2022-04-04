import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitantesPageRoutingModule } from './visitantes-routing.module';

import { VisitantesPage } from './visitantes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitantesPageRoutingModule
  ],
  declarations: [VisitantesPage]
})
export class VisitantesPageModule {}
