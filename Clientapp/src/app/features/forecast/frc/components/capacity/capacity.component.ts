import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { FrcCapacity } from '../../models/frc-capacity.model';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { FrcService } from '../../services/frc.service';
import { cloneable } from 'src/app/shared/classes/cloneable.class';
import { TranslateService } from '@ngx-translate/core';

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
  frcCapacity: FrcCapacity[] = [];
  originalFrcCapacity: FrcCapacity = new FrcCapacity();

  @Input() loadedCapacity: FrcCapacity[] = [];
  @Input() frcId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private frcService: FrcService,
    private notificationService: CustomNotificationService,
    private translateService: TranslateService
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
    }
  }

  public createFormGroup(args: any): FormGroup {
    const item = <FrcCapacity>args.dataItem;

    this.formGroup = this.formBuilder.group({
      id: [item.id],
      capGroup: [item.capGroup, Validators.required],
      capGroupId: [item.capGroupId, Validators.required],
      capName: [item.capName, Validators.required],
      capType: [item.capType, Validators.required],
      unit: [item.unit, Validators.required],
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
    this.formGroup.patchValue({ frcId: this.frcId });
    if (this.formGroup.valid) {
      this.frcService.saveCapacity(this.formGroup.value).subscribe((res) => {
        this.formGroup.patchValue({ id: res });
        this.gridData.data = (<FrcCapacity[]>this.gridData.data).map((item) =>
          item.capGroupId === this.formGroup.get('capGroupId')?.value
            ? this.formGroup.value
            : item
        );
        this.editing = false;
        sender.closeRow(rowIndex);
        this.notificationService.showNotification(
          this.translateService.instant('notifications.saveSuccess'),
          3000,
          'success'
        );
      });
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
