import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByDate'
})
export class FilterByDatePipe implements PipeTransform {
  transform(cours: any[], debut: string, fin: string): any[] {
    if (!cours || (!debut && !fin)) {
      return cours;
    }

    let debutDate = debut ? new Date(debut) : new Date(0); // Si la date de début n'est pas spécifiée, on utilise une date minimale (1er janvier 1970)
    let finDate = fin ? new Date(fin) : new Date(); // Si la date de fin n'est pas spécifiée, on utilise la date du jour

    return cours.filter(c => {
      let dateCours = new Date(c.date);
      return dateCours >= debutDate && dateCours <= finDate;
    });
  }
}
