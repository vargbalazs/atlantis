import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/features/masterdata/general/company/models/company.model';
import { Plant } from 'src/app/features/masterdata/general/plant/models/plant.model';
import { PlanningVersion } from '../../models/version.model';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/createedit.component';
import { CostAccountingType } from 'src/app/features/masterdata/planning/costacctype/models/costacctype.model';
import { CompanyService } from 'src/app/features/masterdata/general/company/services/company.service';
import { PlantService } from 'src/app/features/masterdata/general/plant/services/plant.service';
import { CostAccountingTypeService } from 'src/app/features/masterdata/planning/costacctype/services/costacctype.service';
import { forkJoin } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'ce-version',
  templateUrl: './ce-version.component.html',
  styleUrls: ['../../../../../styles/dialog.css'],
})
export class CreateEditPlanningVersionComponent
  extends CreateEditComponent<PlanningVersion>
  implements OnInit, OnChanges
{
  companies: Company[] = [];
  plants: Plant[] = [];
  filteredPlants: Plant[] = [];
  costAccTypes: CostAccountingType[] = [];

  form: FormGroup = new FormGroup({
    id: new FormControl(this.formData.id),
    descr: new FormControl(this.formData.descr, [Validators.required]),
    year: new FormControl(this.formData.year, [Validators.required]),
    yearDate: new FormControl(this.formData.yearDate, [Validators.required]),
    company: new FormControl(this.formData.company, [Validators.required]),
    plant: new FormControl(this.formData.plant, [Validators.required]),
    costAccType: new FormControl(this.formData.costAccType, [
      Validators.required,
    ]),
    companyId: new FormControl(this.formData.companyId, [Validators.required]),
    plantId: new FormControl(this.formData.plantId, [Validators.required]),
    costAccTypeId: new FormControl(this.formData.costAccTypeId, [
      Validators.required,
    ]),
    status: new FormControl(this.formData.status, [Validators.required]),
  });

  constructor(
    private companyService: CompanyService,
    private plantService: PlantService,
    private costAccTypeService: CostAccountingTypeService
  ) {
    super();
  }

  ngOnInit() {
    forkJoin({
      companies: this.companyService.getCompanies().pipe(first()),
      plants: this.plantService.getPlants().pipe(first()),
      costAccTypes: this.costAccTypeService.getCostAccTypes().pipe(first()),
    }).subscribe(({ companies, plants, costAccTypes }) => {
      this.companies = companies;
      this.plants = plants;
      this.costAccTypes = costAccTypes;
    });
    this.changeControlState(['plant'], false);
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

  companyChange(company: Company) {
    if (company) {
      this.form.patchValue({ companyId: company.id });
      this.filteredPlants = this.plants.filter(
        (plant) => plant.companyId === company.id
      );
      this.changeControlState(['plant'], true);
      if (this.isNew) this.form.patchValue({ status: 0 });
    } else {
      this.resetState();
    }
    if (!this.comboBoxValueChange) {
      this.form.patchValue({ plant: undefined });
    }
  }

  plantChange(plant: Plant) {
    if (plant) {
      this.form.patchValue({ plantId: plant.id });
    }
  }

  yearChange(value: Date) {
    this.form.patchValue({ year: value.getFullYear() });
  }

  costAccTypeChange(costAccType: CostAccountingType) {
    if (costAccType) {
      this.form.patchValue({ costAccTypeId: costAccType.id });
    }
  }

  resetState() {
    this.changeControlState(['plant'], false);
    this.filteredPlants = [];
  }
}
