import {Pipe, PipeTransform} from '@angular/core';

/**
 * transform a millisecond format
 * to HH:mm format
 */
@Pipe({name: 'millisFormat'})
export class MillisFormatPipe implements PipeTransform {
  transform(date: string): string {
    if (date === null) {
      return '--';
    }
    const dateAbs = Math.abs(+date);
    const dateNum = dateAbs / 1000;
    const hour = Math.floor(dateNum / 3600);
    const minute = Math.round((dateNum % 3600) / 60);
    let result = '';
    if (hour < 10) {
      result += '0';
    }
    result += hour.toString() + ':';
    if (minute < 10) {
      result += '0';
    }
    result += minute.toString();
    if (+date >= 0) {
      return result;
    } else {
      return '-' + result;
    }
  }
}

// @Pipe({ name: 'exponentialStrength' })
// export class ExponentialStrength implements PipeTransform {
//   transform(value: number): number {
//     return Math.pow(value, 2);
//   }
// }
