import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StepperComponent } from '@progress/kendo-angular-layout';
import { forkJoin } from 'rxjs';
import { first } from 'rxjs/operators';
import { Company } from 'src/app/features/masterdata/general/company/models/company.model';
import { CompanyService } from 'src/app/features/masterdata/general/company/services/company.service';
import { Plant } from 'src/app/features/masterdata/general/plant/models/plant.model';
import { PlantService } from 'src/app/features/masterdata/general/plant/services/plant.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { uploadCost } from '../../models/uploadcost.model';
import { UploadFileComponent } from '../upload-file/upload-file.component';

@Component({
  selector: 'wizard',
  templateUrl: './wizard.component.html',
  styleUrls: [
    '../../../../../styles/routed-component.css',
    './wizard.component.css',
  ],
})
export class WizardComponent {
  currentStep = 0;
  entityFormPassed = false;
  started = false;
  companies!: Company[];
  plants!: Plant[];
  loadingOverlayVisible = this.loaderService.isLoading;

  @ViewChild('stepper') stepper!: StepperComponent;
  @ViewChild('uploadFileComponent') uploadFileComp!: UploadFileComponent;

  isStepValid = (index: number): boolean => {
    return this.getGroupAt(index).valid || this.currentGroup.untouched;
  };

  shouldValidate = (index: number): boolean => {
    return this.getGroupAt(index).touched && this.currentStep >= index;
  };

  steps = [
    {
      label: 'Gazdasági egység',
      icon: 'globe-outline',
      isValid: this.isStepValid,
      validate: this.shouldValidate,
    },
    {
      label: 'Adatállomány',
      icon: 'file-excel',
      isValid: this.isStepValid,
      validate: this.shouldValidate,
      disabled: true,
    },
    { label: 'Áttekintő', icon: 'preview', disabled: true },
    { label: 'Feltöltés', icon: 'upload', disabled: true },
  ];

  uploadCost = new uploadCost();

  form = new FormGroup({
    entity: new FormGroup({
      companyId: new FormControl(
        this.uploadCost.companyId,
        Validators.required
      ),
      company: new FormControl(this.uploadCost.company, [Validators.required]),
      plantId: new FormControl(this.uploadCost.plantId, [Validators.required]),
      plant: new FormControl(this.uploadCost.plant, [Validators.required]),
      month: new FormControl(this.uploadCost.month, [Validators.required]),
    }),
    file: new FormGroup({
      fileName: new FormControl(this.uploadCost.files, [Validators.required]),
    }),
  });

  get currentGroup(): FormGroup {
    return this.getGroupAt(this.currentStep);
  }

  constructor(
    private companyService: CompanyService,
    private plantService: PlantService,
    private loaderService: LoaderService
  ) {}

  start() {
    this.started = true;
    forkJoin({
      companies: this.companyService.getCompanies().pipe(first()),
      plants: this.plantService.getPlants().pipe(first()),
    }).subscribe(({ companies, plants }) => {
      this.companies = companies;
      this.plants = plants;
    });
  }

  closeWizard() {
    this.started = false;
    this.form.reset();
    this.currentStep = 0;
    this.entityFormPassed = false;
  }

  next() {
    if (this.currentGroup) {
      this.currentGroup.markAllAsTouched();
      this.stepper.validateSteps();
      if (this.currentGroup.valid && this.currentStep !== this.steps.length) {
        this.entityFormPassed = this.currentStep >= 0;
        this.currentStep += 1;
      }
    } else {
      this.currentStep += 1;
    }
    this.steps[this.currentStep].disabled = false;
  }

  prev() {
    this.currentStep -= 1;
  }

  submit() {
    if (this.form.valid) {
      this.uploadFileComp.uploadFile();
    }
  }

  getGroupAt(index: number): FormGroup {
    const groups = Object.keys(this.form.controls).map((groupName) =>
      this.form.get(groupName)
    ) as FormGroup[];

    return groups[index];
  }

  uploadFinished() {
    this.closeWizard();
  }
}
