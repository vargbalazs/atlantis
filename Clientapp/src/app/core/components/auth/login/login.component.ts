import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';

import { userIcon } from '@progress/kendo-svg-icons';
import { AuthService } from '../../../services/auth.service';
import { LoginUserData } from './loginuser.type';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['../authroot/authroot.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('tbxPassword')
  tbxPassword!: TextBoxComponent;

  icons = {
    user: userIcon,
  };

  loginForm!: FormGroup;
  formData: LoginUserData = {
    email: '',
    password: '',
  };

  loadingOverlayVisible: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.initLoginForm();
  }

  ngAfterViewInit() {
    this.tbxPassword.input.nativeElement.type = 'password';
  }

  togglePass() {
    this.authService.togglePass(this.tbxPassword);
    return false;
  }

  showCreateAccountForm() {
    this.router.navigate(['/auth/signup'], { skipLocationChange: true });
  }

  showForgotPwdForm() {
    this.router.navigate(['/auth/forgotpwd'], { skipLocationChange: true });
    return false;
  }

  initLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(this.formData.email, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(this.formData.password, [Validators.required]),
    });
  }

  submitForm() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      // simulate the login, need to be changed later
      this.loadingOverlayVisible = true;
      setTimeout(() => {
        this.router.navigate(['/home'], { skipLocationChange: true });
        this.loadingOverlayVisible = false;
      }, 1500);
    }
  }
}
