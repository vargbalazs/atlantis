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
import { ProvkDetail } from '../../models/provkdetail.model';
import { ProvkService } from '../../services/provk.service';
import { actualCapTypeValue } from './captype.interface';

@Component({
  selector: 'captype-grid',
  templateUrl: './captype-grid.component.html',
  styleUrls: ['../details/details.component.css'],
})
export class CapTypeGridComponent implements OnInit, OnChanges {
  detailsForm!: FormGroup;
  isInEditMode = false;
  loadingOverlayVisible = this.loaderService.isLoading;
  sumBa!: number;

  @Input() provkDetails: ProvkDetail[] = [];
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
    this.provkDetails.forEach((item) => {
      this.formArray.push(this.createFormGroup(item));
    });
  }

  ngOnChanges() {
    // we need ngOnChanges too in order to get the right values (rows) in formArray
    if (this.detailsForm && this.provkDetails.length != 0) {
      // clear form array and create a new form group for each line
      this.formArray.clear();
      this.provkDetails.forEach((item) => {
        this.formArray.push(this.createFormGroup(item));
      });
    }
    this.calculateSumBa();
  }

  editAllRows() {
    // set all rows to edit mode
    this.provkDetails.forEach((item, i) => {
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
    // this.provkService.updateProvkDetails(this.provkDetails).subscribe(() => {
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
      // we manipulate this.provkDetails directly, that's why we don't need to get the values from the formArray
      //this.provkDetails = this.formArray.value;
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

  capValueChange(val: string, rowIndex: number) {
    // get the relevant fields for calculating the ba
    const actual = <actualCapTypeValue>(
      (<object>(<FormGroup[]>this.formArray.value)[rowIndex])
    );
    actual.ba = (+val - actual.normalCap / 12) * actual.fixRate;
    // update the values
    this.provkDetails[rowIndex].ba = actual.ba;
    this.provkDetails[rowIndex].value = +val;
    this.calculateSumBa();
  }

  private closeAllRows() {
    this.provkDetails.forEach((item, i) => {
      this.detailsGrid.closeRow(i);
    });
  }

  private createFormGroup(provkDetail: ProvkDetail = {}) {
    return this.formBuilder.group({
      id: [provkDetail.id],
      value: [provkDetail.value, Validators.required],
      ba: [provkDetail.ba],
      normalCap: [provkDetail.capGroup?.normalCap],
      fixRate: [provkDetail.capGroup?.fixRate],
    });
  }

  private calculateSumBa() {
    this.sumBa = 0;
    this.provkDetails.forEach((item) => (this.sumBa += item.ba!));
    return this.sumBa;
  }
}
