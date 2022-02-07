import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { CostCenter } from 'src/app/features/masterdata/planning/costcenter/models/costcenter.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { CopyEntity } from '../../../../../../shared/models/copy.model';
import { CopyService } from '../../services/copy.service';
import { CostCenterService } from '../../services/costcenter.service';
import { costcenters } from './sampledata';

@Component({
  selector: 'general-costcenter',
  templateUrl: './list-costcenter.component.html',
  styleUrls: ['../../../../../../styles/routed-component.css'],
})
export class CostCenterComponent extends Crud<CostCenter> implements OnInit {
  copyCostCenter!: CopyEntity;

  constructor(
    msgDialogService: MsgDialogService,
    notificationService: NotificationService,
    costcenterService: CostCenterService,
    private copyService: CopyService
  ) {
    super(msgDialogService, notificationService, costcenterService);
  }

  ngOnInit() {
    this.gridData = { data: costcenters, total: costcenters.length };
  }

  showCopyForm() {
    this.copyCostCenter = new CopyEntity();
  }

  cancelHandlerCopyCostCenter() {
    this.copyCostCenter = undefined!;
  }

  saveHandlerCopyCostCenter(copyCostCenter: CopyEntity) {
    this.copyCostCenter = undefined!;
    // this.loadingOverlayVisible=true;
    // this.copyService
    //   .costCentersAlreadyExist(copyCostCenter)
    //   .subscribe((result) => {
    //     if (result) {
    //       this.loadingOverlayVisible = false;
    //       this.msgDialogService.showDialog(
    //         'Másolás',
    //         'A cél évben az adott gyár alatt már léteznek költséghelyek, így a másolás nem lehetséges',
    //         [{ text: 'Ok' }]
    //       );
    //     } else {
    //       this.copyService.copy(copyCostCenter).subscribe(() => {
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
