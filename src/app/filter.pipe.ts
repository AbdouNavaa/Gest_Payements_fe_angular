import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], term: string): any[] {
    if (!items || !term) {
      return items;
    }

    return items.filter(item => item.nom.toLowerCase().includes(term.toLowerCase())
      || item.prenom.toLowerCase().includes(term.toLowerCase())
      || item.Banque.toLowerCase().includes(term.toLowerCase())
      || item.email.toLowerCase().includes(term.toLowerCase()));
  }

}
