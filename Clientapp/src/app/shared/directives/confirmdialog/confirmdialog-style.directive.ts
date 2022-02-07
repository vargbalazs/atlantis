import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[confirmdialog-style]',
})
export class ConfirmDialogStyleDirective {
  @Input() isMsgDialog!: boolean;
  @Input() dialogType!: string;

  @HostBinding('class')
  get elementClass() {
    return this.isMsgDialog ? 'x-' + this.dialogType : '';
  }
}
