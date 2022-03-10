import { Component } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { Crud } from 'src/app/shared/classes/crud.class';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { passwordIcon } from '@progress/kendo-svg-icons';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'userlist',
  templateUrl: './userlist.component.html',
  styleUrls: [
    '../../../../styles/routed-component.css',
    './userlist.component.css',
  ],
})
export class UserListComponent extends Crud<User> {
  userDetails!: User;
  passwordIcon = passwordIcon;

  constructor(
    msgDialogService: MsgDialogService,
    notificationService: NotificationService,
    protected userService: UserService,
    loaderService: LoaderService,
    private customNotificationService: CustomNotificationService
  ) {
    super(msgDialogService, notificationService, userService, loaderService);
  }

  ngOnInit() {
    this.gridData = { data: [], total: 0 };
    this.userService.getUsers().subscribe((users) => {
      users.forEach((user) => {
        // we get this as string from the backend
        user.lastLoginDateDisplay = new Date(user.lastLoginDateDisplay!);
      });
      this.gridData = { data: users, total: users.length };
    });
  }

  showDetails({ dataItem }: { dataItem: User }) {
    this.userDetails = dataItem;
  }

  userDetailsCancel() {
    this.userDetails = undefined!;
  }

  resetPwd({ dataItem }: { dataItem: User }) {
    this.isMsgDialog = true;
    this.dialogType = 'danger';
    this.msgDialogService
      .showDialog(
        'Új jelszó generálás',
        'Valóban új jelszavat szeretnél generálni a kiválasztott felhasználónak?',
        [{ text: 'Nem' }, { text: 'Igen', primary: true }]
      )
      .result.subscribe((result) => {
        const dialogResult = JSON.parse(JSON.stringify(result));
        if (dialogResult.primary) {
          this.userService.resetPassword(dataItem.email!).subscribe((resp) => {
            this.customNotificationService.showNotification(
              'Az új jelszó ki lett küldve a beállított e-mail címre',
              3000,
              'success'
            );
          });
        }
      });
  }
}
