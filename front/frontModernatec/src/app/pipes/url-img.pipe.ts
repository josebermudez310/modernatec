import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlImg'
})
export class UrlImgPipe implements PipeTransform {

  transform(value: string,): string {
    return `https://${value}`;
  }

}
