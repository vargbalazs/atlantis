import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { GridComponent } from '@progress/kendo-angular-grid';
import { CostAccount } from 'src/app/features/masterdata/planning/costaccount/models/costaccount.model';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { CostAssign } from '../../models/costassign.model';
import { HcPlanningItem } from '../../models/hcplanningitem.model';
import { HcPlanningService } from '../../services/hcplanning.service';

@Component({
  selector: 'costassign',
  templateUrl: './costassign.component.html',
  styleUrls: [
    '../../../../../styles/dialog.css',
    '../../../../../styles/routed-component.css',
    './costassign.component.css',
  ],
})
export class CostAssignComponent {
  showCostAssignDialog = false;
  costAssigns: CostAssign[] = [];
  formGroup!: FormGroup;
  editing = false;
  editedRowIndex!: number;
  sumAmount!: number;
  loadingOverlayVisible = this.loaderService.isLoading;

  @Input() set model(costAssigns: CostAssign[]) {
    this.showCostAssignDialog = costAssigns !== undefined;
    this.costAssigns = costAssigns;
    this.sumAmount = this.calculateSumAmount();
  }
  @Input() hcPlanningItem!: HcPlanningItem;
  @Input() costAccounts!: CostAccount[];

  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<{
    hcPlanningItemId: number;
    assigned: boolean;
  }> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private msgDialogService: MsgDialogService,
    private hcPlanningService: HcPlanningService,
    private customNotificationService: CustomNotificationService,
    private loaderService: LoaderService,
    private translateService: TranslateService
  ) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  public createFormGroup(args: any): FormGroup {
    const item = args.isNew ? new CostAssign() : args.dataItem;

    this.formGroup = this.formBuilder.group({
      id: item.id,
      index: [item.index],
      hcPlanningItemId: [item.hcPlanningItemId, Validators.required],
      costAccountId: [item.costAccountId, Validators.required],
      costAccountName: [item.costAccountName],
      amount: [item.amount, Validators.required],
    });

    return this.formGroup;
  }

  getCostAccount(id: number): CostAccount {
    return this.costAccounts.find((costAccount) => costAccount.id === id)!;
  }

  costAccountChange(value: number) {
    this.formGroup.patchValue({
      costAccountName:
        value != undefined ? this.getCostAccount(value).name : '',
    });
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
    this.formGroup.patchValue({
      hcPlanningItemId: this.hcPlanningItem.id,
    });
    if (this.formGroup.valid) {
      if (isNew) {
        const nextRowIndex = this.getNextRowIndex(this.costAssigns);
        this.formGroup.patchValue({ index: nextRowIndex });
        this.costAssigns.push(this.formGroup.value);
      } else {
        this.costAssigns = this.costAssigns.map((item) =>
          item.index === this.formGroup.get('index')?.value
            ? this.formGroup.value
            : item
        );
        this.editing = false;
      }
      sender.closeRow(rowIndex);
    }
    this.calculateSumAmount();
  }

  editHandler({
    sender,
    rowIndex,
    dataItem,
  }: {
    sender: GridComponent;
    rowIndex: number;
    dataItem: CostAssign;
  }) {
    this.editing = true;
    this.closeEditor(sender);
    this.formGroup = this.createFormGroup({ isNew: false, dataItem: dataItem });
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
    this.editing = false;
  }

  removeHandler({ dataItem }: { dataItem: CostAssign }) {
    this.msgDialogService
      .showDialog(
        this.translateService.instant('sidebar.hcPlanning'),
        this.translateService.instant('dialog.confirmDelete'),
        [
          { text: this.translateService.instant('dialog.no') },
          { text: this.translateService.instant('dialog.yes'), primary: true },
        ]
      )
      .result.subscribe((result) => {
        const dialogResult = JSON.parse(JSON.stringify(result));
        if (dialogResult.primary) {
          this.costAssigns = this.costAssigns.filter(
            (item) => item.index !== dataItem.index
          );
          this.calculateSumAmount();
        }
      });
  }

  closeForm() {
    this.showCostAssignDialog = false;
    this.editing = false;
    this.cancel.emit();
  }

  private closeEditor(grid: GridComponent, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined!;
    this.formGroup = undefined!;
  }

  private getNextRowIndex(costAssigns: CostAssign[]): number {
    if (costAssigns.length == 0) return 1;
    return Math.max.apply(
      Math,
      costAssigns.map((costAssign) => {
        return costAssign.index! + 1;
      })
    );
  }

  private calculateSumAmount(): number {
    this.sumAmount = 0;
    if (this.costAssigns) {
      this.costAssigns.forEach(
        (costAssign) => (this.sumAmount += costAssign.amount!)
      );
    }
    return this.sumAmount;
  }

  onSave() {
    this.hcPlanningService
      .saveCostAssigns(this.costAssigns, this.hcPlanningItem.id!)
      .subscribe(() => {
        console.log('finished');
        this.closeForm();
        this.save.emit({
          hcPlanningItemId: this.hcPlanningItem.id!,
          assigned: this.costAssigns.length > 0,
        });
        this.customNotificationService.showNotification(
          this.translateService.instant('notifications.saveSuccess'),
          3000,
          'success'
        );
      });
    console.log('saving...');
  }
}
