import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numbersCollection'
})
export class NumbersCollectionPipe implements PipeTransform {

  transform(value: any, args?: any): number[] {
    let numbers = [];
    for (let i = 1; i <= value; i++) {
      numbers.push(i);
      }
      return numbers;
  }

}
