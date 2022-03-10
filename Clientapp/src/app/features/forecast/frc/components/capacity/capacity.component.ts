import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { FrcCapacity } from '../../models/frc-capacity.model';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { FrcService } from '../../services/frc.service';
import { frcCapacityItems } from './sampledata';
import { cloneable } from 'src/app/shared/classes/cloneable.class';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'capacity',
  templateUrl: './capacity.component.html',
  styleUrls: [],
})
export class CapacityComponent implements OnInit {
  gridData!: GridDataResult;
  actPeriods: number[] = [1, 2];
  actPeriodCount!: number;
  provkPeriods: number[] = [3, 4, 5, 6];
  provkPeriodCount!: number;
  frcPeriods: number[] = [7, 8, 9, 10, 11, 12];
  frcPeriodCount!: number;
  editing = false;
  editedRowIndex!: number;
  formGroup!: FormGroup;
  loadingOverlayVisible = this.loaderService.isLoading;
  frcCapacity: FrcCapacity[] = [];
  originalFrcCapacity: FrcCapacity = new FrcCapacity();

  @Input() loadedCapacity: FrcCapacity[] = [];
  @Input() frcId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private frcService: FrcService,
    private notificationService: CustomNotificationService,
    private loaderService: LoaderService
  ) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  ngOnInit() {
    this.actPeriodCount = 2;
    this.provkPeriodCount = 4;
    this.frcPeriodCount = 6;
    if (this.loadedCapacity.length > 0) {
      this.gridData = {
        data: this.loadedCapacity,
        total: this.loadedCapacity.length,
      };
      this.frcCapacity = this.loadedCapacity;
    } else {
      this.gridData = {
        data: [],
        total: 0,
      };
      setTimeout(() => {
        this.frcCapacity = frcCapacityItems.filter(
          (item) => item.frcId === this.frcId
        );
        this.gridData = {
          data: this.frcCapacity,
          total: this.frcCapacity.length,
        };
      }, 1500);
    }
  }

  public createFormGroup(args: any): FormGroup {
    const item = <FrcCapacity>args.dataItem;

    this.formGroup = this.formBuilder.group({
      id: [item.id, Validators.required],
      capGroup: [item.capGroup, Validators.required],
      capGroupId: [item.capGroupId, Validators.required],
      frcId: [item.frcId, Validators.required],
      p1: [item.p1, Validators.required],
      p2: [item.p2, Validators.required],
      p3: [item.p3, Validators.required],
      p4: [item.p4, Validators.required],
      p5: [item.p5, Validators.required],
      p6: [item.p6, Validators.required],
      p7: [item.p7, Validators.required],
      p8: [item.p8, Validators.required],
      p9: [item.p9, Validators.required],
      p10: [item.p10, Validators.required],
      p11: [item.p11, Validators.required],
      p12: [item.p12, Validators.required],
      total: [item.total, Validators.required],
    });

    return this.formGroup;
  }

  saveHandler({
    sender,
    rowIndex,
  }: {
    sender: GridComponent;
    rowIndex: number;
  }) {
    if (this.formGroup.valid) {
      setTimeout(() => {
        this.gridData.data = (<FrcCapacity[]>this.gridData.data).map((item) =>
          item.id === this.formGroup.get('id')?.value
            ? this.formGroup.value
            : item
        );
        this.editing = false;
        sender.closeRow(rowIndex);
        console.log('finished');
        this.notificationService.showNotification(
          'Adatok sikeresen mentve',
          3000,
          'success'
        );
      }, 1500);
      console.log('saving...');
    }
  }

  editHandler({
    sender,
    rowIndex,
    dataItem,
  }: {
    sender: GridComponent;
    rowIndex: number;
    dataItem: FrcCapacity;
  }) {
    this.editing = true;
    this.closeEditor(sender);
    this.formGroup = this.createFormGroup({ isNew: false, dataItem: dataItem });
    this.originalFrcCapacity = cloneable.deepCopy(dataItem);
    this.editedRowIndex = rowIndex;
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
    this.frcCapacity[rowIndex] = this.originalFrcCapacity;
    this.editing = false;
  }

  private closeEditor(grid: GridComponent, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined!;
    this.formGroup = undefined!;
  }

  periodValueChange(val: string, rowIndex: number, field: string) {
    let total = 0;
    (this.frcCapacity[rowIndex] as any)[field] = +val;
    for (let [key, value] of Object.entries(this.frcCapacity[rowIndex])) {
      if (key.startsWith('p')) total += value;
    }
    this.frcCapacity[rowIndex].total = total;
    this.formGroup.patchValue({ total: total });
  }
}
