import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRootModule } from './authroot/authroot.module';
import { AuthRootComponent } from './authroot/authroot.component';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../interceptor/auth.interceptor';
import { AuthGuard } from '../../guards/auth.guard';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthRootModule],
  providers: [
    AuthGuard,
    AuthService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  exports: [AuthRootComponent],
})
export class AuthModule {}
