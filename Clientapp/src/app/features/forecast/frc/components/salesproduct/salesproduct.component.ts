import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { FrcService } from '../../services/frc.service';
import { FrcSalesProduct } from '../../models/frc-salesproduct.model';
import { cloneable } from 'src/app/shared/classes/cloneable.class';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'salesproduct',
  templateUrl: './salesproduct.component.html',
  styleUrls: [],
})
export class SalesProductComponent implements OnInit {
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
  frcSalesProduct: FrcSalesProduct[] = [];
  originalFrcSalesProduct: FrcSalesProduct = new FrcSalesProduct();

  @Input() frcId!: number;
  @Input() loadedSalesProduct: FrcSalesProduct[] = [];

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
    this.gridData = {
      data: [],
      total: 0,
    };
    this.frcSalesProduct = this.loadedSalesProduct;
    this.gridData = {
      data: this.frcSalesProduct,
      total: this.frcSalesProduct.length,
    };
  }

  public createFormGroup(args: any): FormGroup {
    const item = <FrcSalesProduct>args.dataItem;

    this.formGroup = this.formBuilder.group({
      id: [item.id],
      salesProduct: [item.salesProduct, Validators.required],
      salesProductId: [item.salesProductId, Validators.required],
      capGroup: [item.capGroup, Validators.required],
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
      this.frcService
        .saveSalesProduct(this.formGroup.value)
        .subscribe((res) => {
          this.formGroup.patchValue({ id: res });
          this.gridData.data = (<FrcSalesProduct[]>this.gridData.data).map(
            (item) =>
              item.salesProductId ===
              this.formGroup.get('salesProductId')?.value
                ? this.formGroup.value
                : item
          );
          this.editing = false;
          sender.closeRow(rowIndex);
          console.log('finished');
          this.notificationService.showNotification(
            this.translateService.instant('notifications.saveSuccess'),
            3000,
            'success'
          );
        });
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
    dataItem: FrcSalesProduct;
  }) {
    this.editing = true;
    this.closeEditor(sender);
    this.formGroup = this.createFormGroup({ isNew: false, dataItem: dataItem });
    this.originalFrcSalesProduct = cloneable.deepCopy(dataItem);
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
    this.frcSalesProduct[rowIndex] = this.originalFrcSalesProduct;
    this.editing = false;
  }

  private closeEditor(grid: GridComponent, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined!;
    this.formGroup = undefined!;
  }

  periodValueChange(val: string, rowIndex: number, field: string) {
    let total = 0;
    (this.frcSalesProduct[rowIndex] as any)[field] = +val;
    for (let [key, value] of Object.entries(this.frcSalesProduct[rowIndex])) {
      if (key.startsWith('p')) total += value;
    }
    this.frcSalesProduct[rowIndex].total = total;
    this.formGroup.patchValue({ total: total });
  }
}
