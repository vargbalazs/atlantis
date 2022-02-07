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
    id: new FormControl(this.formData.id),
    itemId: new FormControl(this.formData.itemId, [Validators.required]),
    task: new FormControl(this.formData.task, [Validators.required]),
    year: new FormControl(this.formData.year, [Validators.required]),
    type: new FormControl(this.formData.type, [Validators.required]),
    status: new FormControl(this.formData.status, [Validators.required]),
  });

  onTaskDone() {
    this.active = false;
    this.taskDone.emit(this.form.value);
  }
}
