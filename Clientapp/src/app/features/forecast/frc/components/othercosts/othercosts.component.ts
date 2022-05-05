import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { FrcOtherCost } from '../../models/frc-othercost.model';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { FrcService } from '../../services/frc.service';
import { cloneable } from 'src/app/shared/classes/cloneable.class';
import { CostCenter } from 'src/app/features/masterdata/planning/costcenter/models/costcenter.model';
import { CostAccount } from 'src/app/features/masterdata/planning/costaccount/models/costaccount.model';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { TranslateService } from '@ngx-translate/core';

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
  originalOtherCost: FrcOtherCost = new FrcOtherCost();

  @Input() frcId!: number;
  @Input() plantId!: number;
  @Input() companyId!: number;
  @Input() year!: number;
  @Input() costAccounts!: CostAccount[];
  @Input() costCenters!: CostCenter[];
  @Input() otherCosts!: FrcOtherCost[];

  constructor(
    private formBuilder: FormBuilder,
    private frcService: FrcService,
    private notificationService: CustomNotificationService,
    private msgDialogService: MsgDialogService,
    private translateService: TranslateService
  ) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  ngOnInit() {
    this.gridData = {
      data: this.otherCosts,
      total: this.otherCosts.length,
    };
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
      if (isNew) {
        this.frcService.addOtherCost(this.formGroup.value).subscribe((res) => {
          this.formGroup.patchValue({ id: res });
          this.gridData.data.push(this.formGroup.value);
          this.costSaved(sender, rowIndex);
        });
      } else {
        this.frcService.updateOtherCost(this.formGroup.value).subscribe(() => {
          this.gridData.data = (<FrcOtherCost[]>this.gridData.data).map(
            (item) =>
              item.id === this.formGroup.get('id')?.value
                ? this.formGroup.value
                : item
          );
          this.editing = false;
          this.costSaved(sender, rowIndex);
        });
      }
      console.log('saving...');
    }
  }

  costSaved(sender: GridComponent, rowIndex: number) {
    console.log('finished');
    sender.closeRow(rowIndex);
    this.notificationService.showNotification(
      this.translateService.instant('notifications.saveSuccess'),
      3000,
      'success'
    );
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

  removeHandler({ dataItem }: { dataItem: FrcOtherCost }) {
    this.msgDialogService
      .showDialog(
        'FRC',
        this.translateService.instant('dialog.confirmDelete'),
        [
          { text: this.translateService.instant('dialog.no') },
          { text: this.translateService.instant('dialog.yes'), primary: true },
        ]
      )
      .result.subscribe((result) => {
        const dialogResult = JSON.parse(JSON.stringify(result));
        if (dialogResult.primary) {
          this.frcService.deleteOtherCost(dataItem.id!).subscribe((res) => {
            this.gridData.data = this.gridData.data.filter(
              (item) => item.id !== dataItem.id
            );
            this.notificationService.showNotification(
              this.translateService.instant('notifications.deleteSuccess'),
              3000,
              'success'
            );
          });
        }
      });
  }

  private closeEditor(grid: GridComponent, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined!;
    this.formGroup = undefined!;
  }
}
