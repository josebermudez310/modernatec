import { NgModule } from '@angular/core';
import { RolPipe } from './rol.pipe';
import { CommonModule } from '@angular/common';
import { UrlImgPipe } from './url-img.pipe';
import { EstadoPipe } from './estado.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RolPipe, UrlImgPipe, EstadoPipe],
  exports: [RolPipe,UrlImgPipe, EstadoPipe]
})
export class PipesModule { }