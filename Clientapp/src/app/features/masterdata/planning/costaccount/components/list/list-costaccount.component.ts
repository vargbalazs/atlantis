import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { CostAccount } from 'src/app/features/masterdata/planning/costaccount/models/costaccount.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { CopyEntity } from 'src/app/shared/models/copy.model';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { CopyService } from '../../services/copy.service';
import { CostAccountService } from '../../services/costaccount.service';
import { costAccounts } from './sampledata';

@Component({
  selector: 'general-costaccount',
  templateUrl: './list-costaccount.component.html',
  styleUrls: ['../../../../../../styles/routed-component.css'],
})
export class CostAccountComponent extends Crud<CostAccount> implements OnInit {
  copyCostAccount!: CopyEntity;

  constructor(
    msgDialogService: MsgDialogService,
    notificationService: NotificationService,
    costaccountService: CostAccountService,
    private copyService: CopyService
  ) {
    super(msgDialogService, notificationService, costaccountService);
  }

  ngOnInit() {
    this.gridData = { data: costAccounts, total: costAccounts.length };
  }

  showCopyForm() {
    this.copyCostAccount = new CopyEntity();
  }

  cancelHandlerCopyCostAccount() {
    this.copyCostAccount = undefined!;
  }

  saveHandlerCopyCostAccount(copyCostAccount: CopyEntity) {
    this.copyCostAccount = undefined!;
    // this.loadingOverlayVisible = true;
    // this.copyService
    //   .costCentersAlreadyExist(copyCostAccount)
    //   .subscribe((result) => {
    //     if (result) {
    //       this.loadingOverlayVisible = false;
    //       this.msgDialogService.showDialog(
    //         'Másolás',
    //         'A cél évben az adott gyár alatt már léteznek költséghelyek, így a másolás nem lehetséges',
    //         [{ text: 'Ok' }]
    //       );
    //     } else {
    //       this.copyService.copy(copyCostAccount).subscribe(() => {
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