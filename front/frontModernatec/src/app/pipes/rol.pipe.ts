import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rol'
})
export class RolPipe implements PipeTransform {

  transform(value: number): string {
    //validamos el rol que se envia al pipe
    //retornamos segun cada rol y su numero
    if (value == 1){
      return 'Registros'
    }else if ( value == 2){
      return 'Administrador'
    }else if(value == 3){
      return 'Seguridad'
    }else{
      return 'Invitado'
    }
  }

}
