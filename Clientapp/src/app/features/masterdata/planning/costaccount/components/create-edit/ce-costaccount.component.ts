import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { companies } from 'src/app/features/masterdata/general/company/components/list/sampledata';
import { Company } from 'src/app/features/masterdata/general/company/models/company.model';
import { CostAccount } from 'src/app/features/masterdata/planning/costaccount/models/costaccount.model';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/createedit.component';
import { costGroups } from '../../../costgroup/components/list/sampledata';
import { CostGroup } from '../../../costgroup/models/costgroup.model';

@Component({
  selector: 'ce-costaccount',
  templateUrl: './ce-costaccount.component.html',
  styleUrls: ['../../../../../../styles/dialog.css'],
})
export class CreateEditCostAccountComponent
  extends CreateEditComponent<CostAccount>
  implements OnInit, OnChanges
{
  companies: Company[] = [];
  costGroups: CostGroup[] = [];
  filteredCostGroups: CostGroup[] = [];

  form: FormGroup = new FormGroup({
    id: new FormControl(this.formData.id),
    accountNumber: new FormControl(this.formData.accountNumber, [
      Validators.required,
      Validators.pattern('[0-9]*'),
    ]),
    name: new FormControl(this.formData.name, [Validators.required]),
    fixRate: new FormControl(this.formData.fixRate, [Validators.required]),
    varRate: new FormControl(this.formData.varRate, [Validators.required]),
    usedForPersPlanning: new FormControl(this.formData.usedForPersPlanning),
    year: new FormControl(this.formData.year, [Validators.required]),
    yearDate: new FormControl(this.formData.yearDate, [Validators.required]),
    company: new FormControl(this.formData.company, [Validators.required]),
    companyId: new FormControl(this.formData.companyId, [Validators.required]),
    costGroup: new FormControl(this.formData.costGroup, [Validators.required]),
    costGroupId: new FormControl(this.formData.costGroupId, [
      Validators.required,
    ]),
  });

  ngOnInit() {
    this.companies = companies;
    this.costGroups = costGroups;
    this.changeControlState(['costGroup', 'varRate'], false);
  }

  ngOnChanges() {
    if (this.editMode) {
      // we have to call this manually, because the kendo combobox control doesn't call the valuechange event,
      // if the value is changed programmatically
      this.comboBoxValueChange = true;
      this.companyChange(this.form.get('company')?.value);
      this.comboBoxValueChange = false;
    }
  }

  // needs to be overridden, because of the one disabled control and we won't use getRawValue in the base component
  onSave() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.active = false;
      this.changeControlState(['varRate'], true);
      this.save.emit(this.form.value);
      this.changeControlState(['varRate'], false);
      this.resetState();
    }
  }

  companyChange(company: Company) {
    if (company) {
      this.form.patchValue({ companyId: company.id });
      this.filteredCostGroups = this.costGroups.filter(
        (costgroup) => costgroup.companyId === company.id
      );
      this.changeControlState(['costGroup'], true);
    } else {
      this.resetState();
    }
    if (!this.comboBoxValueChange) {
      this.form.patchValue({ costGroup: undefined });
    }
  }

  costGroupChange(value: CostGroup) {
    this.form.patchValue({ costGroupId: value.id });
  }

  resetState() {
    this.changeControlState(['costGroup'], false);
    this.filteredCostGroups = [];
  }

  fixRateChange(value: string) {
    this.form.patchValue({ varRate: 1 - +value });
  }

  yearChange(value: Date) {
    this.form.patchValue({ year: value.getFullYear() });
  }
}
