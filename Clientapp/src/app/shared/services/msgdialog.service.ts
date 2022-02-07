import { Injectable } from '@angular/core';
import {
  DialogAction,
  DialogRef,
  DialogService,
} from '@progress/kendo-angular-dialog';

@Injectable({ providedIn: 'root' })
export class MsgDialogService {
  constructor(private dialogService: DialogService) {}

  /**
   * shows a dialog with a title and a text and with action buttons
   *
   * @param {string} title
   * @param {string} text
   * @return {*}  {DialogRef}
   * @memberof MsgDialogService
   */
  showDialog(title: string, text: string, actions: DialogAction[]): DialogRef {
    const dialog: DialogRef = this.dialogService.open({
      title: title,
      content: text,
      actions: actions,
      width: 450,
      height: 200,
      minWidth: 250,
    });

    return dialog;
  }
}
