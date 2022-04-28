import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { Subscription } from 'rxjs';
import { ChangePwdModel } from 'src/app/core/models/change-pwd.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { CustomNotificationService } from '../../services/notification.service';

@Component({
  selector: 'changepwd',
  templateUrl: './changepwd.component.html',
  styleUrls: ['../../../core/components/auth/authroot/authroot.component.css'],
})
export class ChangePwdComponent implements OnInit, AfterViewInit, OnDestroy {
  changePwdForm!: FormGroup;
  formData!: ChangePwdModel;
  @ViewChild('tbxActualPassword') tbxActualPassword!: TextBoxComponent;
  @ViewChild('tbxPassword') tbxPassword!: TextBoxComponent;
  @ViewChild('tbxRepeatPassword') tbxRepeatPassword!: TextBoxComponent;
  @Input() fromProfile = false;
  changePwdSub!: Subscription;
  loginSub!: Subscription;
  userName!: string;

  constructor(
    private authService: AuthService,
    private customNotificationService: CustomNotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.changePwdSub = this.authService.changePwdSub.subscribe((userName) => {
      this.userName = userName;
      this.changePwdForm.patchValue({ userName: userName });
      this.submitForm();
    });
    this.loginSub = this.authService.loginSub.subscribe((userName) => {
      this.userName = userName;
    });
    this.formData = new ChangePwdModel();
    this.changePwdForm = new FormGroup(
      {
        userName: new FormControl(this.formData.userName, [
          Validators.required,
        ]),
        oldPassword: new FormControl(this.formData.oldPassword, [
          Validators.required,
        ]),
        newPassword: new FormControl(this.formData.newPassword, [
          Validators.required,
          Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}'),
        ]),
        confirmPassword: new FormControl(this.formData.confirmPassword, [
          Validators.required,
        ]),
      },
      { validators: [this.match('newPassword', 'confirmPassword')] }
    );
  }

  ngAfterViewInit() {
    if (this.tbxPassword) {
      this.tbxActualPassword.input.nativeElement.type = 'password';
      this.tbxPassword.input.nativeElement.type = 'password';
      this.tbxRepeatPassword.input.nativeElement.type = 'password';
    }
  }

  ngOnDestroy() {
    this.changePwdSub.unsubscribe();
    this.loginSub.unsubscribe();
  }

  togglePass() {
    this.authService.togglePass(this.tbxPassword);
    return false;
  }

  togglePassRep() {
    this.authService.togglePass(this.tbxRepeatPassword);
    return false;
  }

  togglePassAct() {
    this.authService.togglePass(this.tbxActualPassword);
    return false;
  }

  submitForm() {
    this.changePwdForm.markAllAsTouched();
    if (this.changePwdForm.valid) {
      const user = <ChangePwdModel>this.changePwdForm.value;
      this.authService.changePassword(user).subscribe(() => {
        this.authService.setFirstLogin(user.userName!).subscribe(() => {
          this.customNotificationService.showNotification(
            'A jelszó sikeresen meg lett változtatva',
            3000,
            'success'
          );
          if (!this.fromProfile)
            this.router.navigate(['/home'], { skipLocationChange: true });
          this.changePwdForm.reset();
        });
      });
    }
  }

  match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors.notMatching) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        return { notMatching: true };
      } else {
        return null;
      }
    };
  }

  hiddenSubmit() {
    this.changePwdForm.patchValue({ userName: this.userName });
  }
}
