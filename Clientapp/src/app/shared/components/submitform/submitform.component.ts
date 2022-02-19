// base component for submitting other forms than create-edit

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MsgDialogService } from '../../services/msgdialog.service';

@Component({
  template: '',
})
export class SubmitFormComponent<T> {
  formData: T = <T>{};
  form: FormGroup = new FormGroup({});
  visible = false;
  checkFunctionsOnSaveClient: ((entity: T) => boolean)[] = [];

  @Input() set model(entity: T) {
    this.form.reset(entity);
    this.visible = entity !== undefined;
  }

  @Input() keepData!: boolean;

  @Output() save: EventEmitter<T> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  constructor(protected msgDialogService: MsgDialogService) {}

  onSave() {
    this.form.markAllAsTouched();
    const saveCheckResults: boolean[] = [];
    if (this.form.valid) {
      // the visibility is setting with the 'model' input property in the parent component
      // this.visible = false;
      // checks before save
      if (this.checkFunctionsOnSaveClient.length > 0) {
        this.checkFunctionsOnSaveClient.forEach((fn) =>
          saveCheckResults.push(fn.call(this, this.form.value))
        );
      }
      // if everything is right, then save
      if (saveCheckResults.every((valid) => valid)) {
        this.save.emit(this.form.value);
        if (!this.keepData) this.resetState();
      }
    }
  }

  onCancel() {
    this.resetState();
    this.closeForm();
  }

  closeForm() {
    this.resetState();
    // the visibility is setting with the 'model' input property in the parent component
    // this.visible = false;
    this.cancel.emit();
  }

  changeControlState(controls: string[], enabled: boolean) {
    for (let i = 0; i <= controls.length - 1; i++) {
      if (enabled) {
        this.form.get(controls[i])?.enable();
      } else {
        this.form.get(controls[i])?.disable();
      }
    }
  }

  // will be overridden in the derived component - cannot be generic
  resetState() {}
}
