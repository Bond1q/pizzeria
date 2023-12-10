import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToStr',
  standalone: true,
})
export class EnumToStrPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }

    return value.replace('_', ' ').toLowerCase();
  }
}
