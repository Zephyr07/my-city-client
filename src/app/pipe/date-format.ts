import {Injectable, Pipe, PipeTransform} from '@angular/core';


@Pipe({
  name: 'dateFormat',
})

@Injectable()
export class DateFormatPipe implements PipeTransform{

  MOIS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];

  transform(value: any, ...args: any[]): any {
    if (value === undefined){
      return '';
    }
    else{
      const date_long = value;
      const date = date_long.split(' ')[0];
      // traitement de la date
      const date_finale = date.split('-')[2] + ' ' + this.MOIS[date.split('-')[1] - 1] + ' ' + date.split('-')[0];
      if (args[0]) {
          return date_finale + ' ' + date_long.split(' ')[1];
      } else {
        return date_finale;
      }
    }
  }
}
