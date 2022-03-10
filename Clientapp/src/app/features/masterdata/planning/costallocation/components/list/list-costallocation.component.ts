import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { CostAllocation } from 'src/app/features/masterdata/planning/costallocation/models/costallocation.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { CopyEntity } from 'src/app/shared/models/copy.model';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { costcenters } from '../../../costcenter/components/list/sampledata';
import { CostCenter } from '../../../costcenter/models/costcenter.model';
import { CostAllocationDetail } from '../../models/costallocationdetail.model';
import { CopyService } from '../../services/copy.service';
import { CostAllocationService } from '../../services/costallocation.service';
import { costAllocations } from './sampledata';
import { costAllocationDetails } from './sampledataDetails';

@Component({
  selector: 'general-costallocation',
  templateUrl: './list-costallocation.component.html',
  styleUrls: ['../../../../../../styles/routed-component.css'],
})
export class CostAllocationComponent
  extends Crud<CostAllocation>
  implements OnInit
{
  selectedCostAllocationDetails!: CostAllocationDetail[];
  selectedCostAllocation!: CostAllocation;
  recCostCenters!: CostCenter[];
  copyAllocation!: CopyEntity;

  constructor(
    msgDialogService: MsgDialogService,
    notificationService: NotificationService,
    costallocationService: CostAllocationService,
    loaderService: LoaderService,
    private copyService: CopyService
  ) {
    super(
      msgDialogService,
      notificationService,
      costallocationService,
      loaderService
    );
  }

  ngOnInit() {
    this.gridData = { data: costAllocations, total: costAllocations.length };
  }

  showAllocationDetails({ dataItem }: { dataItem: CostAllocation }) {
    // get the cost allocation details for the selected cost allocation
    // later we will get the data from a service (api call)
    const details = costAllocationDetails.filter(
      (detail) => detail.costAllocId === dataItem.id
    );
    // get the list of the recCostCenters excluding the base cost center
    // later from a service via api call
    this.recCostCenters = costcenters.filter(
      (costCenter) =>
        costCenter.year === dataItem.year &&
        costCenter.plantId === dataItem.plantId &&
        costCenter.id !== dataItem.allocCostCenterId
    );
    //details.push({ id: 1, costAllocId: 2, recCostCenterId: 1, percent: 20.12 });
    this.selectedCostAllocationDetails = details;
    this.selectedCostAllocation = dataItem;
  }

  cancelAllocationDetails() {
    this.selectedCostAllocationDetails = undefined!;
  }

  showCopyForm() {
    this.copyAllocation = new CopyEntity();
  }

  cancelHandlerCopyAllocation() {
    this.copyAllocation = undefined!;
  }

  saveHandlerCopyAllocation(copyAllocation: CopyEntity) {
    this.copyAllocation = undefined!;
    // this.copyService
    //   .allocationsAlreadyExist(copyAllocation)
    //   .subscribe((result) => {
    //     if (result) {
    //       this.loadingOverlayVisible = false;
    //       this.msgDialogService.showDialog(
    //         'Másolás',
    //         'A cél évben az adott gyár alatt már léteznek átterhelések, így a másolás nem lehetséges',
    //         [{ text: 'Ok' }]
    //       );
    //     } else {
    //       this.copyService.copy(copyAllocation).subscribe(() => {
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
    setTimeout(() => {
      console.log('finished');
      this.showNotification('A másolás sikeresen megtörtént', 3000, 'success');
    }, 1500);
    console.log('copying...');
  }
}
