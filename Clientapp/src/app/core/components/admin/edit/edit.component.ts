import { Component, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user.model';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/createedit.component';

@Component({
  selector: 'edit',
  templateUrl: './edit.component.html',
  styleUrls: [
    '../userlist/userlist.component.css',
    '../details/details.component.css',
  ],
})
export class UserEditComponent
  extends CreateEditComponent<User>
  implements OnChanges
{
  form: FormGroup = new FormGroup({
    id: new FormControl(this.formData.id),
    userId: new FormControl(this.formData.userId, [Validators.required]),
    firstName: new FormControl(this.formData.firstName, [Validators.required]),
    lastName: new FormControl(this.formData.lastName, [Validators.required]),
    userName: new FormControl(this.formData.userName, [Validators.required]),
    email: new FormControl(this.formData.email, [
      Validators.required,
      Validators.email,
    ]),
    joinDate: new FormControl(this.formData.joinDate),
    lastLoginDateDisplay: new FormControl(this.formData.lastLoginDateDisplay),
    active: new FormControl(this.formData.active),
    notLocked: new FormControl(this.formData.notLocked),
    currentUserName: new FormControl(this.formData.currentUserName, [
      Validators.required,
    ]),
    role: new FormControl(this.formData.role, [Validators.required]),
    isNotLocked: new FormControl(this.formData.isNotLocked, [
      Validators.required,
    ]),
    isActive: new FormControl(this.formData.isActive, [Validators.required]),
  });

  ngOnChanges() {
    if (this.form.value) {
      this.form.patchValue({
        currentUserName: this.form.get('userName')!.value,
      });
    }
  }
}
