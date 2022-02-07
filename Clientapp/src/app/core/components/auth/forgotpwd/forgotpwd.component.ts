import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '@progress/kendo-angular-notification';

import { userIcon } from '@progress/kendo-svg-icons';

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

  loadingOverlayVisible: boolean = false;

  constructor(
    private router: Router,
    private notificationService: NotificationService
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
      // simulate the e-mail sending, need to be changed later
      this.loadingOverlayVisible = true;
      setTimeout(() => {
        this.notificationService.show({
          content:
            'Lépj be az email fiókodba és kövesd az elküldött levélben szereplő utasításokat',
          hideAfter: 5000,
          position: { horizontal: 'center', vertical: 'top' },
          animation: { type: 'fade', duration: 400 },
          type: { style: 'success', icon: true },
        });
        this.router.navigate(['/auth/login'], { skipLocationChange: true });
        this.loadingOverlayVisible = false;
      }, 1500);
    }
  }
}
