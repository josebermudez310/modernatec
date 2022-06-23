import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalUserPageRoutingModule } from './modal-user-routing.module';

import { ModalUserPage } from './modal-user.page';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    PipesModule,
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [ModalUserPage]
})
export class ModalUserPageModule {}
