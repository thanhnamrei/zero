import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textDate',
  standalone: true,
})
export class TextDatePipe implements PipeTransform {
  transform(value: Date | null): string {
    if (!value) {
      return '';
    }
    return value.toDateString();
  }
}
