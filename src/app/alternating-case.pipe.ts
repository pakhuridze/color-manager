import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alternatingCase',
  standalone: true
})
export class AlternatingCasePipe implements PipeTransform {
  transform(value: string): string {
    return value.split('').map((char, index) => 
      index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
    ).join('');
  }
}