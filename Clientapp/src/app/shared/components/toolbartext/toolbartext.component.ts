import { Component, Input } from '@angular/core';

@Component({
  selector: 'toolbar-text',
  templateUrl: './toolbartext.component.html',
  styleUrls: ['./toolbartext.component.css'],
})
export class ToolbarTextComponent {
  @Input() caption!: string;
  @Input() value!: any;

  constructor() {}
}
