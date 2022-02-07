import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuEvent } from '@progress/kendo-angular-menu';

@Component({
  selector: 'user-menu',
  templateUrl: './usermenu.component.html',
  styleUrls: ['./usermenu.component.css'],
})
export class UserMenuComponent {
  constructor(private router: Router) {}

  onSelectItem(e: MenuEvent) {
    switch (e.index) {
      // profile
      case '0':
        break;
      // settings
      case '1':
        break;
      // logout
      case '2':
        this.router.navigate(['/auth/login'], { skipLocationChange: true });
        break;
    }
  }
}
