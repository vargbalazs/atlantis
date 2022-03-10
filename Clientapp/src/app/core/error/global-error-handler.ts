import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private zone: NgZone, private router: Router) {}

  handleError(error: any) {
    this.zone.run(() => {
      this.router.navigate(['/error'], {
        skipLocationChange: true,
        state: { error },
      });
    });
  }
}
