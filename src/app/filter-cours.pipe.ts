import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCours'
})
export class FilterCoursPipe implements PipeTransform {

  transform(items: any[], term: string): any[] {
    if (!items || !term) {
      return items;
    }

    return items.filter(item => item.matiere.name.toLowerCase().includes(term.toLowerCase()) || item.prof.nom.toLowerCase().includes(term.toLowerCase()));
  }

}
