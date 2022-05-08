import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { CapGroup } from 'src/app/features/masterdata/production/capgroup/models/capgroup.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { CopyEntity } from '../../../../../../shared/models/copy.model';
import { CopyService } from '../../services/copy.service';
import { CapGroupService } from '../../services/capgroup.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'production-capgroup',
  templateUrl: './list-capgroup.component.html',
  styleUrls: ['../../../../../../styles/routed-component.css'],
})
export class CapGroupComponent extends Crud<CapGroup> implements OnInit {
  copyCapGroup!: CopyEntity;

  constructor(
    msgDialogService: MsgDialogService,
    notificationService: NotificationService,
    private capGroupService: CapGroupService,
    loaderService: LoaderService,
    private copyService: CopyService,
    protected translateService: TranslateService
  ) {
    super(
      msgDialogService,
      notificationService,
      capGroupService,
      loaderService,
      translateService
    );
  }

  ngOnInit() {
    this.gridData = { data: [], total: 0 };
    this.capGroupService.getCapGroups().subscribe((capGroups) => {
      capGroups.forEach(
        (capGroup) => (capGroup.capYearDate = new Date(capGroup.capYearDate!))
      );
      this.gridData = { data: capGroups, total: capGroups.length };
    });
  }

  showCopyForm() {
    this.copyCapGroup = new CopyEntity();
  }

  cancelHandlerCopyCapGroup() {
    this.copyCapGroup = undefined!;
  }

  saveHandlerCopyCapGroup(copyCapGroup: CopyEntity) {
    this.copyCapGroup = undefined!;
    this.msgDialogService.showDialog(
      'Atlantis',
      this.translateService.instant('dialog.notAccessible'),
      [{ text: 'Ok', primary: true }]
    );
    // this.loadingOverlayVisible=true;
    // this.copyService
    //   .capGroupsAlreadyExist(copyCapGroup)
    //   .subscribe((result) => {
    //     if (result) {
    //       this.loadingOverlayVisible = false;
    //       this.msgDialogService.showDialog(
    //         'Másolás',
    //         'A cél évben az adott gyár alatt már léteznek kapacitáscsoportok, így a másolás nem lehetséges',
    //         [{ text: 'Ok' }]
    //       );
    //     } else {
    //       this.copyService.copy(copyCapGroup).subscribe(() => {
    //         this.loadingOverlayVisible = false;
    //         console.log('finished');
    //         this.showNotification(
    //           'A másolás sikeresen megtörtént',
    //           3000,
    //           'success'
    //         );
    //       });
    //     }
    //   });
    // setTimeout(() => {
    //   this.showNotification(
    //     this.translateService.instant('notifications.copySuccess'),
    //     3000,
    //     'success'
    //   );
    // }, 1500);
  }
}
