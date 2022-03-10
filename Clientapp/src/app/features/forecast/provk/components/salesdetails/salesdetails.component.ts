import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GridComponent } from '@progress/kendo-angular-grid';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { SalesDetail } from '../../models/salesdetail.model';
import { ProvkService } from '../../services/provk.service';

@Component({
  selector: 'salesdetails',
  templateUrl: './salesdetails.component.html',
  styleUrls: ['../details/details.component.css'],
})
export class SalesDetailsComponent implements OnInit, OnChanges {
  detailsForm!: FormGroup;
  isInEditMode = false;
  loadingOverlayVisible = this.loaderService.isLoading;

  @Input() salesDetails: SalesDetail[] = [];
  @Input() selectedCapTypeId!: string;
  @Output() switchEditMode: EventEmitter<{
    editMode: boolean;
    selectedCapTypeId: string;
  }> = new EventEmitter();
  @ViewChild('grid') detailsGrid!: GridComponent;

  // shorthand access for form variables/fields
  get formControls() {
    return this.detailsForm.controls;
  }
  get formArray() {
    return this.formControls.formArray as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: CustomNotificationService,
    private provkService: ProvkService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.detailsForm = this.formBuilder.group({
      formArray: new FormArray([]),
    });
    // clear form array and create a new form group for each line
    this.formArray.clear();
    this.salesDetails.forEach((item) => {
      this.formArray.push(this.createFormGroup(item));
    });
  }

  ngOnChanges() {
    // we need ngOnChanges, because on first init, the input property salesDetails is empty,
    // because the component gets loaded via ngIf
    if (this.detailsForm && this.salesDetails.length != 0) {
      // clear form array and create a new form group for each line
      this.formArray.clear();
      this.salesDetails.forEach((item) => {
        this.formArray.push(this.createFormGroup(item));
      });
    }
  }

  editAllRows() {
    // set all rows to edit mode
    this.salesDetails.forEach((item, i) => {
      this.detailsGrid.editRow(i, <FormGroup>this.formArray.controls[i]);
    });
    this.detailsGrid.editRow(0, <FormGroup>this.formArray.controls[0]);
    this.isInEditMode = true;
    this.switchEditMode.emit({
      editMode: this.isInEditMode,
      selectedCapTypeId: this.selectedCapTypeId,
    });
  }

  saveChanges() {
    this.detailsForm.markAllAsTouched();
    if (this.detailsForm.invalid) {
      return;
    }
    // this.provkService.updateSalesDetails(this.salesDetails).subscribe(() => {
    //   this.closeAllRows();
    //   this.isInEditMode = false;
    //   this.switchEditMode.emit({
    //     editMode: this.isInEditMode,
    //     selectedCapTypeId: this.selectedCapTypeId,
    //   });
    //   this.loadingOverlayVisible = false;
    //   this.notificationService.showNotification(
    //     'Az adatok sikeresen mentésre kerültek',
    //     3000,
    //     'success'
    //   );
    // });
    setTimeout(() => {
      this.closeAllRows();
      this.isInEditMode = false;
      this.switchEditMode.emit({
        editMode: this.isInEditMode,
        selectedCapTypeId: this.selectedCapTypeId,
      });
      this.notificationService.showNotification(
        'Az adatok sikeresen mentésre kerültek',
        3000,
        'success'
      );
    }, 1500);
  }

  salesValueChange(val: string, rowIndex: number) {
    this.salesDetails[rowIndex].value = +val;
  }

  private closeAllRows() {
    this.salesDetails.forEach((item, i) => {
      this.detailsGrid.closeRow(i);
    });
  }

  private createFormGroup(salesDetail: SalesDetail = {}) {
    return this.formBuilder.group({
      id: [salesDetail.id],
      value: [salesDetail.value, Validators.required],
    });
  }
}
