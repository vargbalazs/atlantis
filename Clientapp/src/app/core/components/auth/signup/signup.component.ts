import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';

import { userIcon } from '@progress/kendo-svg-icons';
import { AuthService } from '../../../services/auth.service';
import { SignupValidation } from './signup.validators';
import { SignupUserData } from './signupuser.type';

@Component({
  selector: 'auth-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../authroot/authroot.component.css'],
})
export class SignUpComponent implements OnInit, AfterViewInit {
  @ViewChild('tbxPassword')
  tbxPassword!: TextBoxComponent;
  @ViewChild('tbxRepeatPassword') tbxRepeatPassword!: TextBoxComponent;

  icons = {
    user: userIcon,
  };

  signupForm!: FormGroup;
  formData: SignupUserData = {
    email: '',
    password: '',
    passwordConfirm: '',
  };

  loadingOverlayVisible: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.initSignupForm();
  }

  ngAfterViewInit() {
    this.tbxPassword.input.nativeElement.type = 'password';
    this.tbxRepeatPassword.input.nativeElement.type = 'password';
  }

  togglePass() {
    this.authService.togglePass(this.tbxPassword);
    return false;
  }

  togglePassRep() {
    this.authService.togglePass(this.tbxRepeatPassword);
    return false;
  }

  backToLogin() {
    this.router.navigate(['/auth/login'], { skipLocationChange: true });
    return false;
  }

  initSignupForm() {
    this.signupForm = new FormGroup(
      {
        email: new FormControl(
          this.formData.email,
          [Validators.required, Validators.email],
          SignupValidation.checkEmail
        ),
        password: new FormControl(this.formData.password, [
          Validators.required,
          Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}'),
        ]),
        passwordConfirm: new FormControl(this.formData.passwordConfirm, [
          Validators.required,
        ]),
      },
      { validators: [SignupValidation.match('password', 'passwordConfirm')] }
    );
  }

  submitForm() {
    this.signupForm.markAllAsTouched();
    if (this.signupForm.valid) {
      // simulate the sign up, need to be changed later
      this.loadingOverlayVisible = true;
      setTimeout(() => {
        this.router.navigate(['/home'], { skipLocationChange: true });
        this.loadingOverlayVisible = false;
      }, 1500);
    }
  }
}
