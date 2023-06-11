import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCP'
})
export class FilterCPPipe implements PipeTransform {

  transform(items: any[], term: string): any[] {
    if (!items || !term) {
      return items;
    }

    return items.filter(item => item.nom.toLowerCase().includes(term.toLowerCase()) || item.prenom.toLowerCase().includes(term.toLowerCase()));
  }

}
