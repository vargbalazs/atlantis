import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPwdComponent } from '../forgotpwd/forgotpwd.component';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../signup/signup.component';
import { AuthRootComponent } from './authroot.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthRootComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: { animationState: 'LoginPage' },
      },
      {
        path: 'signup',
        component: SignUpComponent,
        data: { animationState: 'SignUpPage' },
      },
      {
        path: 'forgotpwd',
        component: ForgotPwdComponent,
        data: { animationState: 'ForgotPwd' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRootRoutingModule {}
