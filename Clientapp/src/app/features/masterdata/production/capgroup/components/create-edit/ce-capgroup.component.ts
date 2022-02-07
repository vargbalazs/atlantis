import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { companies } from 'src/app/features/masterdata/general/company/components/list/sampledata';
import { plants } from '../../../../general/plant/components/list/sampledata';
import { capTypes } from '../../../captype/components/list/sampledata';
import { Company } from 'src/app/features/masterdata/general/company/models/company.model';
import { Plant } from 'src/app/features/masterdata/general/plant/models/plant.model';
import { CapGroup } from '../../models/capgroup.model';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/createedit.component';
import { CapType } from '../../../captype/models/captype.model';
import { CapUnit } from '../../../capunit/models/capunit.model';
import { capUnits } from '../../../capunit/components/list/sampledata';

@Component({
  selector: 'ce-capgroup',
  templateUrl: './ce-capgroup.component.html',
  styleUrls: ['../../../../../../styles/dialog.css'],
})
export class CreateEditCapGroupComponent
  extends CreateEditComponent<CapGroup>
  implements OnInit, OnChanges
{
  companies: Company[] = [];
  plants: Plant[] = [];
  filteredPlants: Plant[] = [];
  capTypes: CapType[] = [];
  filteredCapTypes: CapType[] = [];
  capUnits: CapUnit[] = [];
  filteredCapUnits: CapUnit[] = [];

  form: FormGroup = new FormGroup({
    id: new FormControl(this.formData.id),
    capGroup: new FormControl(this.formData.capGroup, [Validators.required]),
    capType: new FormControl(this.formData.capType, [Validators.required]),
    capTypeId: new FormControl(this.formData.capTypeId, [Validators.required]),
    capName: new FormControl(this.formData.capName, [Validators.required]),
    capUnit: new FormControl(this.formData.capUnit, [Validators.required]),
    capUnitId: new FormControl(this.formData.capUnitId, [Validators.required]),
    invNr: new FormControl(this.formData.invNr, [Validators.required]),
    capYear: new FormControl(this.formData.capYear, [Validators.required]),
    capYearDate: new FormControl(this.formData.capYearDate, [
      Validators.required,
    ]),
    company: new FormControl(this.formData.company, [Validators.required]),
    plant: new FormControl(this.formData.plant, [Validators.required]),
    companyId: new FormControl(this.formData.companyId, [Validators.required]),
    plantId: new FormControl(this.formData.plantId, [Validators.required]),
    normalCap: new FormControl(this.formData.normalCap, [Validators.required]),
    fixRate: new FormControl(this.formData.fixRate, [Validators.required]),
  });

  ngOnInit() {
    this.companies = companies;
    this.plants = plants;
    this.capTypes = capTypes;
    this.capUnits = capUnits;
    this.changeControlState(['plant', 'capType', 'capUnit'], false);
  }

  ngOnChanges() {
    if (this.editMode) {
      // we have to call this manually, because the kendo combobox control doesn't call the valuechange event,
      // if the value is changed programmatically
      this.comboBoxValueChange = true;
      this.companyChange(this.form.get('company')?.value);
      this.plantChange(this.form.get('plant')?.value);
      this.comboBoxValueChange = false;
    }
  }

  companyChange(company: Company) {
    if (company) {
      this.form.patchValue({ companyId: company.id });
      this.filteredPlants = this.plants.filter(
        (plant) => plant.companyId === company.id
      );
      this.changeControlState(['plant'], true);
      this.changeControlState(['capType'], false);
      this.changeControlState(['capUnit'], false);
    } else {
      this.resetState();
    }
    if (!this.comboBoxValueChange) {
      this.form.patchValue({ plant: undefined });
      this.form.patchValue({ capType: undefined });
      this.form.patchValue({ capUnit: undefined });
    }
  }

  plantChange(plant: Plant) {
    if (plant) {
      this.form.patchValue({ plantId: plant.id });
      this.filteredCapTypes = this.capTypes.filter(
        (capType) => capType.plantId === plant.id
      );
      this.filteredCapUnits = this.capUnits.filter(
        (capUnit) => capUnit.plantId === plant.id
      );
      this.changeControlState(['capType'], true);
      this.changeControlState(['capUnit'], true);
    } else {
      this.filteredCapTypes = [];
      this.filteredCapUnits = [];
      this.changeControlState(['capType'], false);
      this.changeControlState(['capUnit'], false);
    }
    if (!this.comboBoxValueChange) {
      this.form.patchValue({ capType: undefined });
      this.form.patchValue({ capUnit: undefined });
    }
  }

  capTypeChange(capType: CapType) {
    if (capType) this.form.patchValue({ capTypeId: capType.id });
  }

  capUnitChange(capUnit: CapUnit) {
    if (capUnit) this.form.patchValue({ capUnitId: capUnit.id });
  }

  yearChange(value: Date) {
    this.form.patchValue({ capYear: value.getFullYear() });
  }

  resetState() {
    this.changeControlState(['plant', 'capType', 'capUnit'], false);
    this.filteredPlants = [];
    this.filteredCapTypes = [];
  }
}
