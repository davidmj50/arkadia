import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitedText'
})
export class LimitedTextPipe implements PipeTransform {

  transform(value: string, max_chars: number): any {
    return value.substr(0, max_chars) + " ...";
  }

}
