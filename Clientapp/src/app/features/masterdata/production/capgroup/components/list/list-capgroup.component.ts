import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { CapGroup } from 'src/app/features/masterdata/production/capgroup/models/capgroup.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { CopyEntity } from '../../../../../../shared/models/copy.model';
import { CopyService } from '../../services/copy.service';
import { CapGroupService } from '../../services/capgroup.service';
import { capGroups } from './sampledata';

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
    capGroupService: CapGroupService,
    private copyService: CopyService
  ) {
    super(msgDialogService, notificationService, capGroupService);
  }

  ngOnInit() {
    this.gridData = { data: capGroups, total: capGroups.length };
  }

  showCopyForm() {
    this.copyCapGroup = new CopyEntity();
  }

  cancelHandlerCopyCapGroup() {
    this.copyCapGroup = undefined!;
  }

  saveHandlerCopyCapGroup(copyCapGroup: CopyEntity) {
    this.copyCapGroup = undefined!;
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
    this.loadingOverlayVisible = true;
    setTimeout(() => {
      this.loadingOverlayVisible = false;
      console.log('finished');
      this.showNotification('A másolás sikeresen megtörtént', 3000, 'success');
    }, 1500);
    console.log('copying...');
  }
}