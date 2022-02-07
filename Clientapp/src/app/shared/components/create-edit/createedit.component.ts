// base component for the create-edit dialog of the div. entities for handling some repetitive crud methods, events, etc

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  template: '',
})
export class CreateEditComponent<T extends { id?: number }> {
  formData: T = <T>{};
  form: FormGroup = new FormGroup({});

  active = false;
  editMode = false;
  comboBoxValueChange = false;

  @Input() isNew = false;
  @Input() set model(entity: T) {
    this.form.reset(entity);
    this.active = entity !== undefined;
    this.editMode = entity?.id ? true : false;
  }

  @Output() save: EventEmitter<T> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  onSave() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.active = false;
      this.save.emit(this.form.value);
      this.resetState();
    }
  }

  onCancel() {
    this.resetState();
    this.closeForm();
  }

  closeForm() {
    this.resetState();
    this.active = false;
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
