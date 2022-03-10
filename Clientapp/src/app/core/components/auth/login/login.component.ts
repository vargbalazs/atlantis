import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';

import { userIcon } from '@progress/kendo-svg-icons';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';
import { HeaderType } from 'src/app/core/enums/header-type.enum';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['../authroot/authroot.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tbxPassword')
  tbxPassword!: TextBoxComponent;

  icons = {
    user: userIcon,
  };

  loginForm!: FormGroup;
  formData!: User;

  loadingOverlayVisible = this.loaderService.isLoading;

  constructor(
    private router: Router,
    private authService: AuthService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigate(['/home'], { skipLocationChange: true });
    } else {
      this.initLoginForm();
    }
  }

  ngAfterViewInit() {
    this.tbxPassword.input.nativeElement.type = 'password';
  }

  ngOnDestroy() {}

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
    this.formData = new User();
    this.loginForm = new FormGroup({
      userName: new FormControl(this.formData.userName, [Validators.required]),
      password: new FormControl(this.formData.password, [Validators.required]),
    });
  }

  submitForm() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      const user = <User>this.loginForm.value;
      this.authService.login(user).subscribe((res) => {
        const token = res.headers.get(HeaderType.JWT_TOKEN);
        this.authService.saveToken(token!);
        this.authService.addUserToLocalCache(res.body!);
        if (res.body?.isFirstLogin) {
          this.authService.loginSub.next(user.userName!);
          this.router.navigate(['/auth/firstlogin'], {
            skipLocationChange: true,
            state: { userName: user.userName },
          });
        } else {
          this.router.navigate(['/home'], { skipLocationChange: true });
        }
      });
    }
  }
}
