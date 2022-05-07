import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { PlanningVersion } from '../../models/version.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { PlanningVersionService } from '../../services/version.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'versions',
  templateUrl: './list-version.component.html',
  styleUrls: ['../../../../../styles/routed-component.css'],
})
export class PlanningVersionComponent
  extends Crud<PlanningVersion>
  implements OnInit
{
  constructor(
    msgDialogService: MsgDialogService,
    notificationService: NotificationService,
    protected versionService: PlanningVersionService,
    loaderService: LoaderService,
    private customNotificationService: CustomNotificationService,
    protected translateService: TranslateService
  ) {
    super(
      msgDialogService,
      notificationService,
      versionService,
      loaderService,
      translateService
    );
  }

  ngOnInit() {
    this.gridData = { data: [], total: 0 };
    this.versionService.getVersions().subscribe((versions) => {
      versions.forEach(
        (version) => (version.yearDate = new Date(version.yearDate!))
      );
      this.gridData = { data: versions, total: versions.length };
    });
  }

  changeStatus({ dataItem }: { dataItem: PlanningVersion }) {
    this.isMsgDialog = true;
    this.dialogType = 'danger';
    this.msgDialogService
      .showDialog(
        this.translateService.instant('dialog.planVersion'),
        this.translateService.instant('dialog.verStatusChange'),
        [
          { text: this.translateService.instant('dialog.no') },
          { text: this.translateService.instant('dialog.yes'), primary: true },
        ]
      )
      .result.subscribe((result) => {
        const dialogResult = JSON.parse(JSON.stringify(result));
        if (dialogResult.primary) {
          dataItem.status = Number(!dataItem.status);
          this.versionService.update(dataItem).subscribe(() => {
            this.customNotificationService.showNotification(
              this.translateService.instant(
                'notifications.statusChangedSuccess'
              ),
              3000,
              'success'
            );
          });
        }
      });
  }
}
