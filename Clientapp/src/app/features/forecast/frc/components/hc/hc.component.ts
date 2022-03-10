import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { FrcService } from '../../services/frc.service';
import { departments } from 'src/app/features/masterdata/general/department/components/list/sampledata';
import { Department } from 'src/app/features/masterdata/general/department/models/department.model';
import { frcHc } from './sampledata';
import { FrcHc } from '../../models/frc-hc.model';
import { cloneable } from 'src/app/shared/classes/cloneable.class';
import { GroupDescriptor } from '@progress/kendo-data-query';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'hc',
  templateUrl: './hc.component.html',
  styleUrls: [],
})
export class HcComponent implements OnInit {
  gridData!: GridDataResult;
  editing = false;
  editedRowIndex!: number;
  formGroup!: FormGroup;
  loadingOverlayVisible = this.loaderService.isLoading;
  departments: Department[] = [];
  periods: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  originalFrcHc!: FrcHc;
  aggregates!: any[];
  groups!: GroupDescriptor[];

  @Input() frcId!: number;
  @Input() plantId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private frcService: FrcService,
    private notificationService: CustomNotificationService,
    private loaderService: LoaderService
  ) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  ngOnInit() {
    this.gridData = {
      data: [],
      total: 0,
    };
    this.aggregates = this.generateAggregatesArray();
    this.groups = [
      { field: 'hcPlanningItem.costGroup.name', aggregates: this.aggregates },
    ];
    setTimeout(() => {
      this.departments = departments.filter(
        (dep) => dep.plantId === this.plantId
      );
    }, 1500);
  }

  public createFormGroup(args: any): FormGroup {
    const item = <FrcHc>args.dataItem;

    this.formGroup = this.formBuilder.group({
      id: [item.id, Validators.required],
      frcId: [item.frcId, Validators.required],
      hcPlanningItemId: [item.hcPlanningItemId, Validators.required],
      hcPlanningItem: [item.hcPlanningItem, Validators.required],
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
        this.gridData.data = (<FrcHc[]>this.gridData.data).map((item) =>
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
    dataItem: FrcHc;
  }) {
    this.editing = true;
    this.closeEditor(sender);
    this.formGroup = this.createFormGroup({ isNew: false, dataItem: dataItem });
    this.originalFrcHc = cloneable.deepCopy(dataItem);
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
    this.gridData.data[rowIndex] = this.originalFrcHc;
    this.editing = false;
  }

  private closeEditor(grid: GridComponent, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined!;
    this.formGroup = undefined!;
  }

  departmentChange(value: Department) {
    if (value) {
      setTimeout(() => {
        this.gridData.data = frcHc.filter(
          (item) => item.hcPlanningItem?.job?.depId === value.id
        );
      }, 1500);
    }
  }

  generateAggregatesArray(): {}[] {
    let sumFields = [];
    for (let i = 1; i <= 12; i++) {
      sumFields.push({ field: `p${i}`, aggregate: 'sum' });
    }
    return sumFields;
  }
}
