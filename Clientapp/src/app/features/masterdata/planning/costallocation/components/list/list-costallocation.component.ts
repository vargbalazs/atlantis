import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { forkJoin } from 'rxjs';
import { first } from 'rxjs/operators';
import { CostAllocation } from 'src/app/features/masterdata/planning/costallocation/models/costallocation.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { CopyEntity } from 'src/app/shared/models/copy.model';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { CostCenter } from '../../../costcenter/models/costcenter.model';
import { CostCenterService } from '../../../costcenter/services/costcenter.service';
import { CostAllocationDetail } from '../../models/costallocationdetail.model';
import { CopyService } from '../../services/copy.service';
import { CostAllocationService } from '../../services/costallocation.service';

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
    private costAllocationService: CostAllocationService,
    loaderService: LoaderService,
    private copyService: CopyService,
    private costCenterService: CostCenterService,
    protected translateService: TranslateService
  ) {
    super(
      msgDialogService,
      notificationService,
      costAllocationService,
      loaderService,
      translateService
    );
  }

  ngOnInit() {
    this.gridData = { data: [], total: 0 };
    this.costAllocationService
      .getCostAllocations()
      .subscribe((costAllocations) => {
        costAllocations.forEach(
          (costAllocation) =>
            (costAllocation.yearDate = new Date(costAllocation.yearDate!))
        );
        this.gridData = {
          data: costAllocations,
          total: costAllocations.length,
        };
      });
  }

  showAllocationDetails({ dataItem }: { dataItem: CostAllocation }) {
    if (!dataItem.allocCapacity) dataItem.allocCapacity = false;
    forkJoin({
      costAllocDetails: this.costAllocationService
        .getCostAllocDetails(dataItem.id!)
        .pipe(first()),
      costCenters: this.costCenterService.getCostCenters().pipe(first()),
    }).subscribe(({ costAllocDetails, costCenters }) => {
      this.selectedCostAllocationDetails = costAllocDetails;
      this.recCostCenters = costCenters.filter(
        (costCenter) =>
          costCenter.year === dataItem.year &&
          costCenter.plantId === dataItem.plantId &&
          costCenter.id !== dataItem.allocCostCenterId
      );
    });
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
      this.showNotification(
        this.translateService.instant('notifications.copySuccess'),
        3000,
        'success'
      );
    }, 1500);
    console.log('copying...');
  }
}
