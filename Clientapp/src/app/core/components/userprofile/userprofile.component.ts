import { Component, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user.model';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/createedit.component';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: [
    '../admin/userlist/userlist.component.css',
    '../admin/details/details.component.css',
    './userprofile.component.css',
  ],
})
export class UserProfileComponent
  extends CreateEditComponent<User>
  implements OnChanges
{
  lastLoginDate!: string;
  changePwdFormVisible = false;
  userName!: string;
  isMsgDialog = true;
  dialogType = 'danger';

  form: FormGroup = new FormGroup({
    id: new FormControl(this.formData.id),
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

  constructor(
    private authService: AuthService,
    private msgDialogService: MsgDialogService
  ) {
    super();
  }

  ngOnChanges() {
    if (this.form.get('userName')!.value) {
      this.form.patchValue({
        currentUserName: this.form.get('userName')!.value,
      });
      const lastLoginDateDisplay = new Date(
        this.form.get('lastLoginDateDisplay')?.value
      );
      this.lastLoginDate =
        lastLoginDateDisplay.getFullYear() === 1970
          ? ''
          : lastLoginDateDisplay.toString();
    }
  }

  showPwdChangeForm() {
    this.changePwdFormVisible = true;
    this.userName = this.form.get('userName')!.value;
    this.authService.loginSub.next(this.userName);
  }

  showAccessRightsForm() {
    this.msgDialogService.showDialog(
      'Atlantis',
      'Ez a funkció jelenleg nem elérhető',
      [{ text: 'OK', primary: true }]
    );
  }
}
