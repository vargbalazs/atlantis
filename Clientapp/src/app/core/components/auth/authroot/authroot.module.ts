import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRootRoutingModule } from './authroot-routing.module';
import { AuthRootComponent } from './authroot.component';
import { LoginModule } from '../login/login.module';
import { SignUpModule } from '../signup/signup.module';
import { ForgotPwdModule } from '../forgotpwd/forgotpwd.module';
import { FirstLoginModule } from '../firstlogin/firstlogin.module';

@NgModule({
  declarations: [AuthRootComponent],
  imports: [
    CommonModule,
    AuthRootRoutingModule,
    LoginModule,
    SignUpModule,
    ForgotPwdModule,
    FirstLoginModule,
  ],
  providers: [],
  exports: [AuthRootComponent],
})
export class AuthRootModule {}
