import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { ActProdData } from 'src/app/features/productiondata/actual/models/act-prod-data.model';
import { FilterEntity } from 'src/app/shared/models/filter.model';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { ActProdDataService } from '../../services/act-prod-data.service';
import { actualProdData } from './sampledata';

@Component({
  selector: 'actual-prod-data',
  templateUrl: './list-actual.component.html',
  styleUrls: [
    '../../../../../styles/routed-component.css',
    './list-actual.component.css',
  ],
})
export class ActProdDataComponent implements OnInit {
  filterEntity!: FilterEntity;
  gridData!: GridDataResult;
  loadingOverlayVisible = false;
  periods: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  editing = false;
  editedRowIndex!: number;
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private actProdDataService: ActProdDataService,
    private notificationService: CustomNotificationService
  ) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  ngOnInit() {
    // on init no data load, because we will filter the data
    //this.gridData = { data: actualProdData, total: actualProdData.length };
    this.gridData = { data: [], total: 0 };
  }

  public createFormGroup(args: any): FormGroup {
    const item = <ActProdData>args.dataItem;

    this.formGroup = this.formBuilder.group({
      id: [item.id, Validators.required],
      capGroup: [item.capGroup, Validators.required],
      capGroupId: [item.capGroupId, Validators.required],
      companyId: [item.companyId, Validators.required],
      plantId: [item.plantId, Validators.required],
      year: [item.year, Validators.required],
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

  showFilterForm() {
    this.filterEntity = new FilterEntity();
  }

  cancelFilterForm() {
    this.filterEntity = undefined!;
  }

  saveFilterForm(filterEntity: FilterEntity) {
    this.filterEntity = undefined!;
    this.loadingOverlayVisible = true;
    // this.actProdDataService
    //   .getActualData(
    //     filterEntity.companyId!,
    //     filterEntity.plantId!,
    //     filterEntity.year?.getFullYear()!
    //   )
    //   .subscribe((result) => {
    //     this.loadingOverlayVisible = false;
    //     this.gridData = { data: result, total: result.length };
    //   });

    setTimeout(() => {
      this.loadingOverlayVisible = false;
      const filteredData = actualProdData.filter(
        (item) =>
          item.companyId === filterEntity.companyId &&
          item.plantId === filterEntity.plantId &&
          item.year === filterEntity.year?.getFullYear()
      );
      this.gridData = { data: filteredData, total: filteredData.length };
      console.log('finished');
    }, 1500);
    console.log('filtering...');
  }

  saveHandler({
    sender,
    rowIndex,
  }: {
    sender: GridComponent;
    rowIndex: number;
  }) {
    if (this.formGroup.valid) {
      this.loadingOverlayVisible = true;
      // this.actProdDataService.update(this.formGroup.value).subscribe(() => {
      //   this.editing = false;
      //   sender.closeRow(rowIndex);
      //   console.log('finished');
      //   this.notificationService.showNotification(
      //     'Adatok sikeresen mentve',
      //     3000,
      //     'success'
      //   );
      // });
      setTimeout(() => {
        this.loadingOverlayVisible = false;
        this.gridData.data = (<ActProdData[]>this.gridData.data).map((item) =>
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
    dataItem: ActProdData;
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

  private closeEditor(grid: GridComponent, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined!;
    this.formGroup = undefined!;
  }
}