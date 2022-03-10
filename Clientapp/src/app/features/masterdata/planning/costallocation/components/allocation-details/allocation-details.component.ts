import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GridComponent } from '@progress/kendo-angular-grid';
import { CostCenter } from '../../../costcenter/models/costcenter.model';
import { CostAllocation } from '../../models/costallocation.model';
import { CostAllocationDetail } from '../../models/costallocationdetail.model';
import { MsgDialogService } from '../../../../../../shared/services/msgdialog.service';
import { CostAllocationService } from '../../services/costallocation.service';
import { NotificationService } from '@progress/kendo-angular-notification';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'allocation-details',
  templateUrl: './allocation-details.component.html',
  styleUrls: [
    '../../../../../../styles/dialog.css',
    '../../../../../../styles/routed-component.css',
    './allocation-details.component.css',
  ],
})
export class AllocationDetailsComponent {
  showAllocationDetailsDialog = false;
  costAllocationDetails: CostAllocationDetail[] = [];
  formGroup!: FormGroup;
  editing = false;
  editedRowIndex!: number;
  sumPercent!: number;
  sumCapacity!: number;
  loadingOverlayVisible = this.loaderService.isLoading;
  isMsgDialog = true;
  dialogType = 'danger';
  editRecCostCenterId!: number;

  @Input() set model(costAllocationDetails: CostAllocationDetail[]) {
    this.showAllocationDetailsDialog = costAllocationDetails !== undefined;
    this.costAllocationDetails = costAllocationDetails;
    this.sumPercent = this.calculateSumPercent();
    this.sumCapacity = this.calculateSumCapacity();
  }
  @Input() costAllocation!: CostAllocation;
  @Input() recCostCenters!: CostCenter[];

  @Output() cancel: EventEmitter<any> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private msgDialogService: MsgDialogService,
    private costAllocationService: CostAllocationService,
    private notificationService: NotificationService,
    private loaderService: LoaderService
  ) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  public createFormGroup(args: any): FormGroup {
    const item = args.isNew ? new CostAllocationDetail() : args.dataItem;

    this.formGroup = this.formBuilder.group({
      id: item.id,
      costAllocId: [item.costAllocId, Validators.required],
      costAlloc: [item.costAlloc, Validators.required],
      baseCostCenterId: [item.baseCostCenterId, Validators.required],
      baseCostCenter: [item.baseCostCenter, Validators.required],
      recCostCenterId: [item.recCostCenterId, Validators.required],
      recCostCenter: [item.recCostCenter, Validators.required],
      recCostCenterName: [item.recCostCenterName],
      percent: [item.percent, Validators.required],
      capacity: [item.capacity, Validators.required],
      index: item.index,
    });

    return this.formGroup;
  }

  getCostCenter(id: number): CostCenter {
    return this.recCostCenters.find((costCenter) => costCenter.id === id)!;
  }

  recCostCenterChange(value: number) {
    this.formGroup.patchValue({
      recCostCenterName:
        value != undefined ? this.getCostCenter(value).name : '',
    });
  }

  checkRecCostCenter(recCostCenterId: number): boolean {
    // if the selected cost center is already in use
    return this.costAllocationDetails.some(
      (detail) =>
        detail.recCostCenterId === recCostCenterId &&
        recCostCenterId != this.editRecCostCenterId
    );
  }

  capacityChange(value: number) {
    const percent = (value / this.costAllocation.totalCapacity!) * 100;
    this.formGroup.patchValue({ percent: percent });
  }

  saveHandler({
    sender,
    rowIndex,
    isNew,
  }: {
    sender: GridComponent;
    rowIndex: number;
    isNew: boolean;
  }) {
    if (
      this.checkRecCostCenter(+this.formGroup.controls['recCostCenterId'].value)
    ) {
      this.msgDialogService
        .showDialog(
          'Átterhelés',
          'A kiválasztott költséghely már használatban van',
          [{ text: 'OK', primary: true }]
        )
        .result.subscribe((result) => {
          const dialogResult = JSON.parse(JSON.stringify(result));
          if (dialogResult.primary) {
            this.formGroup.patchValue({ recCostCenterId: null });
          }
        });
      return;
    }
    this.formGroup.patchValue({
      baseCostCenterId: this.costAllocation.allocCostCenterId,
    });
    this.formGroup.patchValue({
      baseCostCenter: new CostCenter(this.costAllocation.allocCostCenterId),
    });
    this.formGroup.patchValue({
      recCostCenter: new CostCenter(
        this.formGroup.get('recCostCenterId')!.value
      ),
    });
    this.formGroup.patchValue({ costAllocId: this.costAllocation.id });
    this.formGroup.patchValue({ costAlloc: this.costAllocation });
    if (!this.costAllocation.allocCapacity)
      this.formGroup.patchValue({ capacity: 0 });
    if (this.formGroup.valid) {
      if (isNew) {
        const nextRowIndex = this.getNextRowIndex(this.costAllocationDetails);
        this.formGroup.patchValue({ index: nextRowIndex });
        this.costAllocationDetails.push(this.formGroup.value);
      } else {
        this.costAllocationDetails = this.costAllocationDetails.map((item) =>
          item.index === this.formGroup.get('index')?.value
            ? this.formGroup.value
            : item
        );
        this.editing = false;
      }
      sender.closeRow(rowIndex);
    }
    this.calculateSumPercent();
    this.calculateSumCapacity();
  }

  editHandler({
    sender,
    rowIndex,
    dataItem,
  }: {
    sender: GridComponent;
    rowIndex: number;
    dataItem: CostAllocationDetail;
  }) {
    this.editing = true;
    this.closeEditor(sender);
    this.formGroup = this.createFormGroup({ isNew: false, dataItem: dataItem });
    this.editedRowIndex = rowIndex;
    this.editRecCostCenterId = dataItem.recCostCenterId!;
    sender.editRow(rowIndex, this.formGroup);
  }

  cancelHandler({
    sender,
    rowIndex,
  }: {
    sender: GridComponent;
    rowIndex: number;
  }) {
    this.closeEditor(sender, rowIndex);
    this.editing = false;
  }

  removeHandler({ dataItem }: { dataItem: CostAllocationDetail }) {
    this.msgDialogService
      .showDialog(
        'Átterhelés',
        'Valóban törölni szeretnéd a kiválasztott elemet?',
        [{ text: 'Nem' }, { text: 'Igen', primary: true }]
      )
      .result.subscribe((result) => {
        const dialogResult = JSON.parse(JSON.stringify(result));
        if (dialogResult.primary) {
          this.costAllocationDetails = this.costAllocationDetails.filter(
            (item) => item.index !== dataItem.index
          );
          this.calculateSumPercent();
          this.calculateSumCapacity();
        }
      });
  }

  closeForm() {
    this.showAllocationDetailsDialog = false;
    this.editing = false;
    this.cancel.emit();
  }

  private closeEditor(grid: GridComponent, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined!;
    this.formGroup = undefined!;
  }

  private getNextRowIndex(
    costAllocationDetails: CostAllocationDetail[]
  ): number {
    if (costAllocationDetails.length == 0) return 1;
    return Math.max.apply(
      Math,
      costAllocationDetails.map((costAllocDetail) => {
        return costAllocDetail.index! + 1;
      })
    );
  }

  private calculateSumPercent(): number {
    this.sumPercent = 0;
    if (this.costAllocationDetails) {
      this.costAllocationDetails.forEach(
        (detail) => (this.sumPercent += detail.percent!)
      );
    }
    return this.sumPercent;
  }

  private calculateSumCapacity(): number {
    this.sumCapacity = 0;
    if (this.costAllocationDetails) {
      this.costAllocationDetails.forEach(
        (detail) => (this.sumCapacity += detail.capacity!)
      );
    }
    return this.sumCapacity;
  }

  onSave() {
    // save only if the sum percent = 100
    if (this.calculateSumPercent() !== 100) {
      this.msgDialogService
        .showDialog(
          'Átterhelés',
          'A felosztandó költséghelyeknek 100%-ot kell kiadniuk',
          [{ text: 'OK', primary: true }]
        )
        .result.subscribe((result) => {
          const dialogResult = JSON.parse(JSON.stringify(result));
          if (dialogResult.primary) {
            return;
          }
        });
    } else {
      // this.costAllocationService
      //   .saveAllocationDetails(this.costAllocationDetails)
      //   .subscribe(() => {
      //     console.log('finished');
      //     this.closeForm();
      //     this.notificationService.show({
      //       content: 'Az adatok sikeresen mentésre kerültek',
      //       hideAfter: 3000,
      //       position: { horizontal: 'center', vertical: 'top' },
      //       animation: { type: 'fade', duration: 400 },
      //       type: { style: 'success', icon: true },
      //     });
      //   });
      setTimeout(() => {
        console.log('finished');
        this.closeForm();
        this.notificationService.show({
          content: 'Az adatok sikeresen mentésre kerültek',
          hideAfter: 3000,
          position: { horizontal: 'center', vertical: 'top' },
          animation: { type: 'fade', duration: 400 },
          type: { style: 'success', icon: true },
        });
      }, 1500);
      console.log('saving...');
    }
  }
}
