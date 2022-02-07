import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { PlanningVersion } from '../../models/version.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { PlanningVersionService } from '../../services/version.service';
import { versions } from './sampledata';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';

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
    private customNotificationService: CustomNotificationService
  ) {
    super(msgDialogService, notificationService, versionService);
  }

  ngOnInit() {
    this.gridData = { data: versions, total: versions.length };
  }

  changeStatus({ dataItem }: { dataItem: PlanningVersion }) {
    this.msgDialogService
      .showDialog(
        'Tervverzió',
        'Valóban meg szeretnéd változtatni a tervverzió státuszát?',
        [{ text: 'Nem' }, { text: 'Igen', primary: true }]
      )
      .result.subscribe((result) => {
        const dialogResult = JSON.parse(JSON.stringify(result));
        if (dialogResult.primary) {
          this.loadingOverlayVisible = true;
          // this.versionService.changeStatus(+!dataItem.status).subscribe(() => {
          //   this.customNotificationService.showNotification(
          //     'A státusz sikeresen módosításra került',
          //     3000,
          //     'success'
          //   );
          //   this.loadingOverlayVisible = false;
          // });
          setTimeout(() => {
            this.gridData.data.forEach((item: PlanningVersion) => {
              if (item.id === dataItem.id) item.status = +!dataItem.status;
            });
            this.customNotificationService.showNotification(
              'A státusz sikeresen módosításra került',
              3000,
              'success'
            );
            this.loadingOverlayVisible = false;
          }, 1500);
        }
      });
  }
}
