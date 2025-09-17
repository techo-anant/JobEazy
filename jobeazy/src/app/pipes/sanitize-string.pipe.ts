import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sanitizeString',
  standalone: true,
})
export class SanitizeStringPipe implements PipeTransform {

  transform(str: string | undefined | null, find: string ="", replace: string = " "): string {
    if(!str) return "";
    if(!find) return str.trim();

    return str.replaceAll(find, replace);
  }

}
