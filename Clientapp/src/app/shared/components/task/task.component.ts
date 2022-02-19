import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/createedit.component';

@Component({
  selector: 'ce-task',
  templateUrl: './task.component.html',
  styleUrls: ['../../../styles/dialog.css'],
})
export class CreateEditTaskComponent extends CreateEditComponent<Task> {
  @Output() taskDone: EventEmitter<Task> = new EventEmitter();

  form: FormGroup = new FormGroup({
    planningItemId: new FormControl(this.formData.planningItemId, [
      Validators.required,
    ]),
    taskName: new FormControl(this.formData.taskName, [Validators.required]),
    taskType: new FormControl(this.formData.taskType, [Validators.required]),
    taskStatus: new FormControl(this.formData.taskStatus, [
      Validators.required,
    ]),
  });

  onTaskDone() {
    this.active = false;
    this.taskDone.emit(this.form.value);
  }
}
