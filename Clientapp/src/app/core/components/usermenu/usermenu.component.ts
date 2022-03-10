import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuEvent } from '@progress/kendo-angular-menu';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Crud } from 'src/app/shared/classes/crud.class';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user-menu',
  templateUrl: './usermenu.component.html',
  styleUrls: ['./usermenu.component.css'],
})
export class UserMenuComponent extends Crud<User> implements OnInit {
  userName!: string;
  user!: User;
  loggedInUser!: User;

  constructor(
    msgDialogService: MsgDialogService,
    notificationService: NotificationService,
    protected userService: UserService,
    loaderService: LoaderService,
    private authService: AuthService,
    private customNotificationService: CustomNotificationService,
    private router: Router
  ) {
    super(msgDialogService, notificationService, userService, loaderService);
  }

  ngOnInit() {
    this.user = this.authService.getUserFromLocalCache();
    this.userName = `${this.user.firstName} ${this.user.lastName}`;
  }

  onSelectItem(e: MenuEvent) {
    switch (e.index) {
      // profile
      case '0':
        this.loggedInUser = this.user;
        break;
      // settings
      case '1':
        break;
      // logout
      case '2':
        this.authService.logout();
        this.router.navigate(['/auth/login'], { skipLocationChange: true });
        this.customNotificationService.showNotification(
          'A kijelentkezés sikeres',
          3000,
          'success'
        );
        break;
    }
  }

  saveUserHandler(user: User) {
    this.userService
      .update(user, this.userService.updateProfileToken, true)
      .subscribe((resp) => {
        this.authService.addUserToLocalCache(<User>resp);
        this.showNotification(
          'A módosítás sikeresen megtörtént',
          3000,
          'success'
        );
      });
  }

  cancelUserHandler() {
    this.editDataItem = undefined!;
  }
}
