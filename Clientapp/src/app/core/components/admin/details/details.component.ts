import { Component, Input, OnChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/core/models/user.model';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/createedit.component';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { ListItem } from './listitem.type';

@Component({
  selector: 'userdetails',
  templateUrl: './details.component.html',
  styleUrls: ['../userlist/userlist.component.css', './details.component.css'],
})
export class UserDetailsComponent
  extends CreateEditComponent<User>
  implements OnChanges
{
  @Input() user!: User;
  listItems: ListItem[] = [];
  loadingOverlayVisible = this.loaderService.isLoading;
  lastLoginDateDisplay!: string;
  isMsgDialog = true;
  dialogType = 'danger';

  constructor(
    private loaderService: LoaderService,
    private msgDialogService: MsgDialogService,
    private translateService: TranslateService
  ) {
    super();
  }

  ngOnChanges() {
    if (this.user) {
      this.listItems = [];
      this.listItems.push(
        { item: this.user.userId!.toString(), icon: 'user' },
        { item: this.user.email!, icon: 'email' },
        { item: this.user.role!, icon: 'accessibility' },
        {
          item: this.user.isNotLocked
            ? this.translateService.instant('user.notLocked')
            : this.translateService.instant('user.locked'),
          icon: this.user.isNotLocked ? 'unlock' : 'lock',
        }
      );
      this.lastLoginDateDisplay =
        this.user.lastLoginDateDisplay?.getFullYear() === 1970
          ? ''
          : this.user.lastLoginDateDisplay?.toString()!;
    }
  }

  showAccessRightsForm() {
    this.msgDialogService.showDialog(
      'Atlantis',
      this.translateService.instant('dialog.notAccessible'),
      [{ text: 'OK', primary: true }]
    );
  }
}
