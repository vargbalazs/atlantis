import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  noInterceptRoutes = [
    'api/user/login',
    'api/user/signup',
    'api/user/forgotpassword',
    'api/user/usernameexists',
    'api/user/useremailexists',
  ];

  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.noInterceptRoutes.some((route) => req.url.includes(route)))
      return next.handle(req);

    this.authService.loadToken();
    const token = this.authService.getToken();
    const request = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });

    return next.handle(request);
  }
}
