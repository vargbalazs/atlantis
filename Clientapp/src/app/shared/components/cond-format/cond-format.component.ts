import { Component, Input } from '@angular/core';

@Component({
  selector: 'cond-format',
  templateUrl: './cond-format.component.html',
  styleUrls: ['./cond-format.component.css'],
})
export class CondFormatComponent {
  @Input() value!: number;

  constructor() {}
}
