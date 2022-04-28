import { Component } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { Crud } from 'src/app/shared/classes/crud.class';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { passwordIcon } from '@progress/kendo-svg-icons';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { TranslateService } from '@ngx-translate/core';

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
    private customNotificationService: CustomNotificationService,
    private translateService: TranslateService
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
        this.translateService.instant('dialog.generateNewPassword'),
        this.translateService.instant('dialog.confirmGenerateNewPassword'),
        [
          { text: this.translateService.instant('dialog.no') },
          { text: this.translateService.instant('dialog.yes'), primary: true },
        ]
      )
      .result.subscribe((result) => {
        const dialogResult = JSON.parse(JSON.stringify(result));
        if (dialogResult.primary) {
          this.userService.resetPassword(dataItem.email!).subscribe((resp) => {
            this.customNotificationService.showNotification(
              this.translateService.instant(
                'dialog.generateNewPasswordSuccess'
              ),
              3000,
              'success'
            );
          });
        }
      });
  }
}
