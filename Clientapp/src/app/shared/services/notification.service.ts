import { Injectable } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';

@Injectable({ providedIn: 'root' })
export class CustomNotificationService {
  constructor(private notificationService: NotificationService) {}

  showNotification(
    text: string,
    hideAfter: number,
    type: 'none' | 'success' | 'warning' | 'error' | 'info'
  ) {
    this.notificationService.show({
      content: text,
      hideAfter: hideAfter,
      position: { horizontal: 'center', vertical: 'top' },
      animation: { type: 'fade', duration: 400 },
      type: { style: type, icon: true },
    });
  }
}
