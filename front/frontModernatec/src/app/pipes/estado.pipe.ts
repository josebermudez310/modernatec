import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estado'
})
export class EstadoPipe implements PipeTransform {

  transform(value: boolean|string): string {
    console.log('estado');
    if (value=='false'){
      return 'Desactivado'
    }
    if(value){
      return 'Activado'
    }
    return 'Desactivado'
  }

}
