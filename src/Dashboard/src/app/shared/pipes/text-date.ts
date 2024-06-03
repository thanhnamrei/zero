import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textDate',
  standalone: true,
})
export class TextDatePipe implements PipeTransform {
  transform(value: string) {
    return new Date(value).toDateString();
  }
}
