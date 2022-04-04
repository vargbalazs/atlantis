import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { PlanningVersion } from '../../models/version.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { PlanningVersionService } from '../../services/version.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

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
    private customNotificationService: CustomNotificationService
  ) {
    super(msgDialogService, notificationService, versionService, loaderService);
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
        'Tervverzió',
        'Valóban meg szeretnéd változtatni a tervverzió státuszát?',
        [{ text: 'Nem' }, { text: 'Igen', primary: true }]
      )
      .result.subscribe((result) => {
        const dialogResult = JSON.parse(JSON.stringify(result));
        if (dialogResult.primary) {
          dataItem.status = 1;
          this.versionService.update(dataItem).subscribe(() => {
            this.customNotificationService.showNotification(
              'A státusz sikeresen módosításra került',
              3000,
              'success'
            );
          });
        }
      });
  }
}
