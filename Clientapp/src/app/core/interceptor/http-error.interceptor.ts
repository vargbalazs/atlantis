import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private customNotificationService: CustomNotificationService,
    private loaderService: LoaderService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // token, if we check username or e-mail
    // in this case we don't need the loader
    const checkUserNameOrEmailToken = request.context.get(
      this.authService.checkUserNameOrEmailToken
    );

    if (!checkUserNameOrEmailToken) this.loaderService.show();

    return new Observable((observer) => {
      // token, if we update the user profile from the profile menu
      // in this case we have to hide the user menu
      const updateProfileToken = request.context.get(
        this.userService.updateProfileToken
      );

      next.handle(request).subscribe(
        (res) => {
          observer.next(res);
        },
        (err: HttpErrorResponse) => {
          this.loaderService.hide();
          if (err.error.message) {
            this.customNotificationService.showNotification(
              err.error.message,
              3000,
              'error'
            );
          } else {
            this.customNotificationService.showNotification(
              'Ismeretlen eredetű hiba. Lépj kapcsolatba a rendszer üzemeltetőjével.',
              3000,
              'error'
            );
          }
          if (updateProfileToken) this.userService.profielUpdated.next();
        },
        () => {
          this.loaderService.hide();
          if (updateProfileToken) this.userService.profielUpdated.next();
        }
      );
    });
  }
}
