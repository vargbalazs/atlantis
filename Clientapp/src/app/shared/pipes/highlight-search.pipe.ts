import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
})
export class HighlightSearch implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, args: string): SafeHtml {
    if (!args) return value;

    // match must be case insensitive
    const regexp = new RegExp(args, 'gi');
    const match = value.match(regexp);

    // if no match, return the original value
    if (!match) return value;

    // highlight the matched text
    const replacedValue = value.replace(
      regexp,
      '<span style="background-color: #4fc3f7;color: white">' +
        match[0] +
        '</span>'
    );

    return this.sanitizer.bypassSecurityTrustHtml(replacedValue);
  }
}
