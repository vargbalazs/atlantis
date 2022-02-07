import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { companies } from 'src/app/features/masterdata/general/company/components/list/sampledata';
import { plants } from '../../../../general/plant/components/list/sampledata';
import { costcenters } from '../../../costcenter/components/list/sampledata';
import { Company } from 'src/app/features/masterdata/general/company/models/company.model';
import { Plant } from 'src/app/features/masterdata/general/plant/models/plant.model';
import { CostAllocation } from '../../models/costallocation.model';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/createedit.component';
import { CostCenter } from '../../../costcenter/models/costcenter.model';
import { CostAccount } from '../../../costaccount/models/costaccount.model';
import { costAccounts } from '../../../costaccount/components/list/sampledata';

@Component({
  selector: 'ce-costallocation',
  templateUrl: './ce-costallocation.component.html',
  styleUrls: ['../../../../../../styles/dialog.css'],
})
export class CreateEditCostAllocationComponent
  extends CreateEditComponent<CostAllocation>
  implements OnInit, OnChanges
{
  companies: Company[] = [];
  plants: Plant[] = [];
  allocCostCenters: CostCenter[] = [];
  costAccounts: CostAccount[] = [];
  filteredPlants: Plant[] = [];
  filteredAllocCostCenters: CostCenter[] = [];
  filteredCostAccounts: CostAccount[] = [];

  capacityChecked: boolean = false;

  form: FormGroup = new FormGroup({
    id: new FormControl(this.formData.id),
    name: new FormControl(this.formData.name, [Validators.required]),
    level: new FormControl(this.formData.level, [
      Validators.required,
      Validators.pattern('[0-9]*'),
    ]),
    year: new FormControl(this.formData.year, [Validators.required]),
    yearDate: new FormControl(this.formData.yearDate, [Validators.required]),
    company: new FormControl(this.formData.company, [Validators.required]),
    plant: new FormControl(this.formData.plant, [Validators.required]),
    allocCostCenter: new FormControl(this.formData.allocCostCenter, [
      Validators.required,
    ]),
    costAccount: new FormControl(this.formData.costAccount, [
      Validators.required,
    ]),
    allocCapacity: new FormControl(this.formData.allocCapacity),
    capacityUnit: new FormControl(this.formData.capacityUnit, [
      Validators.required,
    ]),
    totalCapacity: new FormControl(this.formData.totalCapacity, [
      Validators.required,
      Validators.pattern('[0-9]*'),
    ]),
    companyId: new FormControl(this.formData.companyId, [Validators.required]),
    plantId: new FormControl(this.formData.plantId, [Validators.required]),
    allocCostCenterId: new FormControl(this.formData.allocCostCenterId, [
      Validators.required,
    ]),
    costAccountId: new FormControl(this.formData.costAccountId, [
      Validators.required,
    ]),
  });

  ngOnInit() {
    this.companies = companies;
    this.plants = plants;
    this.allocCostCenters = costcenters;
    this.costAccounts = costAccounts;
    this.changeControlState(
      [
        'plant',
        'yearDate',
        'allocCostCenter',
        'costAccount',
        'capacityUnit',
        'totalCapacity',
      ],
      false
    );
  }

  ngOnChanges() {
    this.changeControlState(['capacityUnit', 'totalCapacity'], false);
    if (this.editMode) {
      // we have to call this manually, because the kendo combobox control doesn't call the valuechange event,
      // if the value is changed programmatically
      this.comboBoxValueChange = true;
      this.companyChange(this.form.get('company')?.value);
      this.plantChange(this.form.get('plant')?.value);
      this.yearChange(this.form.get('yearDate')?.value);
      this.allocCostCenterChange(this.form.get('allocCostCenter')?.value);
      this.capacityCheckChange(this.form.get('allocCapacity')?.value);
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
      this.changeControlState(
        ['yearDate', 'allocCostCenter', 'costAccount'],
        false
      );
    } else {
      this.resetState();
    }
    if (!this.comboBoxValueChange) {
      this.form.patchValue({ plant: undefined });
      this.form.patchValue({ yearDate: undefined });
      this.form.patchValue({ allocCostCenter: undefined });
      this.form.patchValue({ costAccount: undefined });
    }
  }

  plantChange(plant: Plant) {
    if (plant) {
      this.form.patchValue({ plantId: plant.id });
      this.changeControlState(['yearDate'], true);
      this.changeControlState(['allocCostCenter', 'costAccount'], false);
    } else {
      this.form.patchValue({ yearDate: undefined });
      this.filteredAllocCostCenters = [];
      this.filteredCostAccounts = [];
      this.changeControlState(
        ['yearDate', 'allocCostCenter', 'costAccount'],
        false
      );
    }
    if (!this.comboBoxValueChange) {
      this.form.patchValue({ yearDate: undefined });
      this.form.patchValue({ allocCostCenter: undefined });
      this.form.patchValue({ costAccount: undefined });
    }
  }

  yearChange(value: Date) {
    if (value) {
      this.form.patchValue({ year: value.getFullYear() });
      this.filteredAllocCostCenters = this.allocCostCenters.filter(
        (costCenter) =>
          costCenter.plantId === this.form.get('plantId')?.value &&
          costCenter.year === value.getFullYear()
      );
      this.changeControlState(['allocCostCenter'], true);
      this.changeControlState(['costAccount'], false);
    } else {
      this.filteredAllocCostCenters = [];
      this.filteredCostAccounts = [];
      this.changeControlState(['allocCostCenter', 'costAccount'], false);
    }
    if (!this.comboBoxValueChange) {
      this.form.patchValue({ allocCostCenter: undefined });
      this.form.patchValue({ costAccount: undefined });
    }
  }

  allocCostCenterChange(costCenter: CostCenter) {
    if (costCenter) {
      this.form.patchValue({ allocCostCenterId: costCenter.id });
      this.filteredCostAccounts = this.costAccounts.filter(
        (account) => account.year === costCenter.year
      );
      this.changeControlState(['costAccount'], true);
    } else {
      this.filteredCostAccounts = [];
      this.changeControlState(['costAccount'], false);
    }
    if (!this.comboBoxValueChange) {
      this.form.patchValue({ costAccount: undefined });
    }
  }

  costAccountChange(costAccount: CostAccount) {
    if (costAccount) {
      this.form.patchValue({ costAccountId: costAccount.id });
    }
  }

  resetState() {
    this.changeControlState(
      ['plant', 'yearDate', 'allocCostCenter', 'costAccount'],
      false
    );
    this.filteredPlants = [];
    this.form.patchValue({ yearDate: undefined });
    this.filteredAllocCostCenters = [];
    this.filteredCostAccounts = [];
  }

  capacityCheckChange(e: any) {
    this.capacityChecked = e.target ? e.target.checked : e;
    this.changeControlState(
      ['capacityUnit', 'totalCapacity'],
      this.capacityChecked
    );
    if (!this.capacityChecked) {
      this.form.patchValue({ totalCapacity: null, capacityUnit: '' });
    }
  }
}
