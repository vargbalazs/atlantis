import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { companies } from 'src/app/features/masterdata/general/company/components/list/sampledata';
import { plants } from '../../../../general/plant/components/list/sampledata';
import { Company } from 'src/app/features/masterdata/general/company/models/company.model';
import { Plant } from 'src/app/features/masterdata/general/plant/models/plant.model';
import { SalesProduct } from '../../models/salesproduct.model';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/createedit.component';
import { CapUnit } from '../../../capunit/models/capunit.model';
import { capUnits } from '../../../capunit/components/list/sampledata';
import { CapGroup } from '../../../capgroup/models/capgroup.model';
import { capGroups } from '../../../capgroup/components/list/sampledata';

@Component({
  selector: 'ce-salesproduct',
  templateUrl: './ce-salesproduct.component.html',
  styleUrls: ['../../../../../../styles/dialog.css'],
})
export class CreateEditSalesProductComponent
  extends CreateEditComponent<SalesProduct>
  implements OnInit, OnChanges
{
  companies: Company[] = [];
  plants: Plant[] = [];
  filteredPlants: Plant[] = [];
  capGroups: CapGroup[] = [];
  filteredCapGroups: CapGroup[] = [];
  units: CapUnit[] = [];
  filteredUnits: CapUnit[] = [];

  form: FormGroup = new FormGroup({
    id: new FormControl(this.formData.id),
    name: new FormControl(this.formData.name, [Validators.required]),
    year: new FormControl(this.formData.year, [Validators.required]),
    yearDate: new FormControl(this.formData.yearDate, [Validators.required]),
    company: new FormControl(this.formData.company, [Validators.required]),
    plant: new FormControl(this.formData.plant, [Validators.required]),
    companyId: new FormControl(this.formData.companyId, [Validators.required]),
    plantId: new FormControl(this.formData.plantId, [Validators.required]),
    capGroup: new FormControl(this.formData.capGroup, [Validators.required]),
    capGroupId: new FormControl(this.formData.capGroupId, [
      Validators.required,
    ]),
    unit: new FormControl(this.formData.unit, [Validators.required]),
    unitId: new FormControl(this.formData.unitId, [Validators.required]),
  });

  ngOnInit() {
    this.companies = companies;
    this.plants = plants;
    this.units = capUnits;
    this.capGroups = capGroups;
    this.changeControlState(['plant', 'yearDate', 'capGroup', 'unit'], false);
  }

  ngOnChanges() {
    if (this.editMode) {
      // we have to call this manually, because the kendo combobox control doesn't call the valuechange event,
      // if the value is changed programmatically
      this.comboBoxValueChange = true;
      this.companyChange(this.form.get('company')?.value);
      this.plantChange(this.form.get('plant')?.value);
      this.yearChange(this.form.get('yearDate')?.value);
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
      this.changeControlState(['yearDate', 'capGroup', 'unit'], false);
    } else {
      this.resetState();
    }
    if (!this.comboBoxValueChange) {
      this.form.patchValue({ plant: undefined });
      this.form.patchValue({ yearDate: undefined });
      this.form.patchValue({ capGroup: undefined });
      this.form.patchValue({ unit: undefined });
    }
  }

  plantChange(plant: Plant) {
    if (plant) {
      this.form.patchValue({ plantId: plant.id });
      this.changeControlState(['yearDate'], true);
    } else {
      this.filteredCapGroups = [];
      this.filteredUnits = [];
      this.changeControlState(['yearDate', 'capGroup', 'unit'], false);
    }
    if (!this.comboBoxValueChange) {
      this.form.patchValue({ yearDate: undefined });
      this.form.patchValue({ capGroup: undefined });
      this.form.patchValue({ unit: undefined });
    }
  }

  yearChange(value: Date) {
    if (value) {
      this.form.patchValue({ year: value.getFullYear() });
      this.filteredCapGroups = this.capGroups.filter(
        (capGroup) =>
          capGroup.plantId === this.form.get('plantId')?.value &&
          capGroup.capYear === this.form.get('year')?.value
      );
      this.filteredUnits = this.units.filter(
        (unit) => unit.plantId === this.form.get('plantId')?.value
      );
      this.changeControlState(['capGroup', 'unit'], true);
    } else {
      this.filteredCapGroups = [];
      this.filteredUnits = [];
      this.changeControlState(['capGroup', 'unit'], false);
    }
    if (!this.comboBoxValueChange) {
      this.form.patchValue({ capGroup: undefined });
      this.form.patchValue({ unit: undefined });
    }
  }

  capGroupChange(capGroup: CapGroup) {
    if (capGroup) this.form.patchValue({ capGroupId: capGroup.id });
  }

  unitChange(unit: CapUnit) {
    if (unit) this.form.patchValue({ unitId: unit.id });
  }

  resetState() {
    this.changeControlState(['plant', 'yearDate', 'capGroup', 'unit'], false);
    this.filteredPlants = [];
    this.filteredCapGroups = [];
    this.filteredUnits = [];
  }
}
