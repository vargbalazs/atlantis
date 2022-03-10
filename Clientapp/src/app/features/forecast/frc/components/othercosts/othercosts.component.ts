import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { FrcOtherCost } from '../../models/frc-othercost.model';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { FrcService } from '../../services/frc.service';
import { otherCosts } from './sampledata';
import { cloneable } from 'src/app/shared/classes/cloneable.class';
import { CostCenter } from 'src/app/features/masterdata/planning/costcenter/models/costcenter.model';
import { costcenters } from 'src/app/features/masterdata/planning/costcenter/components/list/sampledata';
import { costAccounts } from 'src/app/features/masterdata/planning/costaccount/components/list/sampledata';
import { CostAccount } from 'src/app/features/masterdata/planning/costaccount/models/costaccount.model';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'othercosts',
  templateUrl: './othercosts.component.html',
  styleUrls: [],
})
export class OtherCostsComponent implements OnInit {
  gridData!: GridDataResult;
  periods: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  editing = false;
  editedRowIndex!: number;
  formGroup!: FormGroup;
  loadingOverlayVisible = this.loaderService.isLoading;
  otherCosts: FrcOtherCost[] = [];
  originalOtherCost: FrcOtherCost = new FrcOtherCost();
  costCenters: CostCenter[] = [];
  costAccounts: CostAccount[] = [];

  @Input() frcId!: number;
  @Input() plantId!: number;
  @Input() companyId!: number;
  @Input() year!: number;

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
    setTimeout(() => {
      this.otherCosts = otherCosts.filter((item) => item.frcId === this.frcId);
      this.gridData = {
        data: this.otherCosts,
        total: this.otherCosts.length,
      };
      this.costCenters = costcenters.filter(
        (item) => item.plantId === this.plantId && item.year === this.year
      );
      this.costAccounts = costAccounts.filter(
        (item) => item.companyId === this.companyId && item.year === this.year
      );
    }, 1500);
  }

  public createFormGroup(args: any): FormGroup {
    const item = args.isNew ? new FrcOtherCost() : args.dataItem;

    this.formGroup = this.formBuilder.group({
      id: [item.id],
      costAcc: [item.costAcc, Validators.required],
      costAccId: [item.costAccId, Validators.required],
      costAccName: [item.costAccName],
      costCenter: [item.costCenter, Validators.required],
      costCenterId: [item.costCenterId, Validators.required],
      frcId: [item.frcId, Validators.required],
      costEffect: [item.costEffect, Validators.required],
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

  getCostCenter(id: number): CostCenter {
    return this.costCenters.find((costCenter) => costCenter.id === id)!;
  }

  getCostAccount(id: number): CostAccount {
    return this.costAccounts.find((costAccount) => costAccount.id === id)!;
  }

  costAccountChange(value: number) {
    this.formGroup.patchValue({
      costAccName: value != undefined ? this.getCostAccount(value).name : '',
    });
    this.formGroup.patchValue({ costAcc: this.getCostAccount(value) });
  }

  costCenterChange(value: number) {
    this.formGroup.patchValue({ costCenter: this.getCostCenter(value) });
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
    this.formGroup.patchValue({ frcId: this.frcId });
    if (this.formGroup.valid) {
      setTimeout(() => {
        if (isNew) {
          this.gridData.data.push(this.formGroup.value);
        } else {
          this.gridData.data = (<FrcOtherCost[]>this.gridData.data).map(
            (item) =>
              item.id === this.formGroup.get('id')?.value
                ? this.formGroup.value
                : item
          );
          this.editing = false;
        }
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
    dataItem: FrcOtherCost;
  }) {
    this.editing = true;
    this.closeEditor(sender);
    this.formGroup = this.createFormGroup({ isNew: false, dataItem: dataItem });
    this.originalOtherCost = cloneable.deepCopy(dataItem);
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
    this.otherCosts[rowIndex] = this.originalOtherCost;
    this.editing = false;
  }

  private closeEditor(grid: GridComponent, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined!;
    this.formGroup = undefined!;
  }
}
