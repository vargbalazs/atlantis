import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { userIcon } from '@progress/kendo-svg-icons';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'forgot-pwd',
  templateUrl: './forgotpwd.component.html',
  styleUrls: ['../authroot/authroot.component.css'],
})
export class ForgotPwdComponent implements OnInit {
  icons = {
    user: userIcon,
  };

  forgotPwdForm!: FormGroup;
  formData: any = {
    email: '',
  };

  loadingOverlayVisible = this.loaderService.isLoading;

  constructor(
    private router: Router,
    private customNotificationService: CustomNotificationService,
    private loaderService: LoaderService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initForgotPwdForm();
  }

  backToLogin() {
    this.router.navigate(['/auth/login'], { skipLocationChange: true });
    return false;
  }

  initForgotPwdForm() {
    this.forgotPwdForm = new FormGroup({
      email: new FormControl(this.formData.email, [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  submitForm() {
    this.forgotPwdForm.markAllAsTouched();
    if (this.forgotPwdForm.valid) {
      const email = <string>this.forgotPwdForm.get('email')?.value;
      this.authService.forgotPassword(email).subscribe(() => {
        this.customNotificationService.showNotification(
          'Lépj be az email fiókodba és kövesd az elküldött levélben szereplő utasításokat',
          3000,
          'success'
        );
        this.router.navigate(['/auth/login'], { skipLocationChange: true });
      });
    }
  }
}
