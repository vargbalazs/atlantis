import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { userIcon } from '@progress/kendo-svg-icons';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'auth-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../authroot/authroot.component.css'],
})
export class SignUpComponent implements OnInit {
  icons = {
    user: userIcon,
  };

  signupForm!: FormGroup;
  formData!: User;

  loadingOverlayVisible = this.loaderService.isLoading;

  constructor(
    private router: Router,
    private authService: AuthService,
    private customNotificationService: CustomNotificationService,
    private loaderService: LoaderService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigate(['/home'], { skipLocationChange: true });
    } else {
      this.initSignupForm();
    }
  }

  backToLogin() {
    this.router.navigate(['/auth/login'], { skipLocationChange: true });
    return false;
  }

  initSignupForm() {
    this.formData = new User();
    this.signupForm = new FormGroup({
      userName: new FormControl(
        this.formData.userName,
        [Validators.required],
        this.checkUserName.bind(this)
      ),
      firstName: new FormControl(this.formData.firstName, [
        Validators.required,
      ]),
      lastName: new FormControl(this.formData.lastName, [Validators.required]),
      email: new FormControl(
        this.formData.email,
        [Validators.required, Validators.email],
        this.checkUserEmail.bind(this)
      ),
    });
  }

  submitForm() {
    this.signupForm.markAllAsTouched();
    if (this.signupForm.valid) {
      const user = <User>this.signupForm.value;
      this.authService.register(user).subscribe((resp: User) => {
        this.customNotificationService.showNotification(
          this.translateService.instant('notifications.registerSuccess'),
          5000,
          'success'
        );
        this.backToLogin();
      });
    }
  }

  checkUserName(control: AbstractControl): Promise<any> | Observable<any> {
    return new Promise((resolve, reject) => {
      this.authService.userNameExists(control.value).subscribe((res) => {
        if (res) {
          resolve({ userNameIsAlreadyInUse: res });
        } else {
          resolve(null);
        }
      });
    });
  }

  checkUserEmail(control: AbstractControl): Promise<any> | Observable<any> {
    return new Promise((resolve, reject) => {
      this.authService.emailExists(control.value).subscribe((res) => {
        if (res) {
          resolve({ userEmailIsAlreadyInUse: res });
        } else {
          resolve(null);
        }
      });
    });
  }
}
