import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StepperComponent } from '@progress/kendo-angular-layout';
import { uploadCost } from '../../models/uploadcost.model';

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

  @ViewChild('stepper', { static: true }) stepper!: StepperComponent;

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
    },
    { label: 'Áttekintő', icon: 'preview' },
    { label: 'Feltöltés', icon: 'upload' },
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
      fileName: new FormControl(this.uploadCost.fileName, [
        Validators.required,
      ]),
    }),
  });

  get currentGroup(): FormGroup {
    return this.getGroupAt(this.currentStep);
  }

  constructor() {}

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
  }

  prev() {
    this.currentStep -= 1;
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

  getGroupAt(index: number): FormGroup {
    const groups = Object.keys(this.form.controls).map((groupName) =>
      this.form.get(groupName)
    ) as FormGroup[];

    return groups[index];
  }
}
