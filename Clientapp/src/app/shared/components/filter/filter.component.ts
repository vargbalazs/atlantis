import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { companies } from 'src/app/features/masterdata/general/company/components/list/sampledata';
import { plants } from '../../../features/masterdata/general/plant/components/list/sampledata';
import { Company } from 'src/app/features/masterdata/general/company/models/company.model';
import { Plant } from 'src/app/features/masterdata/general/plant/models/plant.model';
import { SubmitFormComponent } from 'src/app/shared/components/submitform/submitform.component';
import { FilterEntity } from '../../models/filter.model';
import { CostAccountingType } from 'src/app/features/masterdata/planning/costacctype/models/costacctype.model';
import { CostCenter } from 'src/app/features/masterdata/planning/costcenter/models/costcenter.model';
import { costAccTypes } from 'src/app/features/masterdata/planning/costacctype/components/list/sampledata';
import { costcenters } from 'src/app/features/masterdata/planning/costcenter/components/list/sampledata';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['../../../styles/dialog.css'],
})
export class FilterComponent
  extends SubmitFormComponent<FilterEntity>
  implements OnInit, OnChanges
{
  companies: Company[] = [];
  plants: Plant[] = [];
  filteredPlants: Plant[] = [];
  costAccTypes: CostAccountingType[] = [];
  costCenters: CostCenter[] = [];
  filteredCostCenters: CostCenter[] = [];

  formVisible = false;
  @Input() planning = false;
  @Input() frc = false;

  form: FormGroup = new FormGroup({
    year: new FormControl(this.formData.year, [Validators.required]),
    company: new FormControl(this.formData.company, [Validators.required]),
    plant: new FormControl(this.formData.plant, [Validators.required]),
    companyId: new FormControl(this.formData.companyId, [Validators.required]),
    plantId: new FormControl(this.formData.plantId, [Validators.required]),
    costAccTypeId: new FormControl(this.formData.costAccTypeId),
    costAccType: new FormControl(this.formData.costAccType),
    costCenterId: new FormControl(this.formData.costCenterId),
    costCenter: new FormControl(this.formData.costCenter),
  });

  ngOnInit() {
    this.companies = companies;
    this.plants = plants;
    this.changeControlState(['plant', 'year', 'costCenter'], false);
    if (this.frc || this.planning) {
      this.form.controls.costAccTypeId.setValidators(Validators.required);
      this.form.controls.costAccType.setValidators(Validators.required);
      this.costAccTypes = costAccTypes;
    }
    if (this.planning) {
      this.form.controls.costCenterId.setValidators(Validators.required);
      this.form.controls.costCenter.setValidators(Validators.required);
      this.costCenters = costcenters;
    }
  }

  ngOnChanges() {
    this.formVisible = this.visible;
  }

  companyChange(company: Company) {
    if (company) {
      this.form.patchValue({ companyId: company.id });
      this.filteredPlants = this.plants.filter(
        (plant) => plant.companyId === company.id
      );
      this.changeControlState(['plant'], true);
    } else {
      this.resetState();
    }
    this.form.patchValue({ plant: undefined });
    this.form.patchValue({ year: undefined });
    this.form.patchValue({ costCenter: undefined });
  }

  plantChange(plant: Plant) {
    if (plant) {
      this.form.patchValue({ plantId: plant.id });
      this.changeControlState(['year'], true);
    } else {
      this.changeControlState(['year', 'costCenter'], false);
    }
    this.form.patchValue({ year: undefined });
    this.form.patchValue({ costCenter: undefined });
  }

  yearChange(value: Date) {
    if (value) {
      this.filteredCostCenters = this.costCenters.filter(
        (costCenter) =>
          costCenter.plantId === +this.form.get('plantId')!.value &&
          costCenter.year === value.getFullYear()
      );
      this.changeControlState(['costCenter'], true);
    } else {
      this.changeControlState(['costCenter'], false);
    }
    this.form.patchValue({ costCenter: undefined });
  }

  costAccTypeChange(value: CostAccountingType) {
    this.form.patchValue({ costAccTypeId: value.id });
  }

  costCenterChange(value: CostCenter) {
    this.form.patchValue({ costCenterId: value.id });
  }

  resetState() {
    this.changeControlState(['plant', 'year', 'costCenter'], false);
    this.filteredPlants = [];
    this.filteredCostCenters = [];
  }
}
