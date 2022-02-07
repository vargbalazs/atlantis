import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { companies } from 'src/app/features/masterdata/general/company/components/list/sampledata';
import { plants } from '../../../../general/plant/components/list/sampledata';
import { Company } from 'src/app/features/masterdata/general/company/models/company.model';
import { Plant } from 'src/app/features/masterdata/general/plant/models/plant.model';
import { CostCenter } from '../../models/costcenter.model';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/createedit.component';
import { PlantArea } from 'src/app/features/masterdata/general/plantarea/models/plantarea.model';
import { plantareas } from 'src/app/features/masterdata/general/plantarea/components/list/sampledata';

@Component({
  selector: 'ce-costcenter',
  templateUrl: './ce-costcenter.component.html',
  styleUrls: ['../../../../../../styles/dialog.css'],
})
export class CreateEditCostCenterComponent
  extends CreateEditComponent<CostCenter>
  implements OnInit, OnChanges
{
  companies: Company[] = [];
  plants: Plant[] = [];
  filteredPlants: Plant[] = [];
  plantAreas: PlantArea[] = [];
  filteredPlantAreas: PlantArea[] = [];

  form: FormGroup = new FormGroup({
    id: new FormControl(this.formData.id),
    code: new FormControl(this.formData.code, [Validators.required]),
    name: new FormControl(this.formData.name, [Validators.required]),
    year: new FormControl(this.formData.year, [Validators.required]),
    yearDate: new FormControl(this.formData.yearDate, [Validators.required]),
    company: new FormControl(this.formData.company, [Validators.required]),
    plant: new FormControl(this.formData.plant, [Validators.required]),
    plantArea: new FormControl(this.formData.plantArea, [Validators.required]),
    companyId: new FormControl(this.formData.companyId, [Validators.required]),
    plantId: new FormControl(this.formData.plantId, [Validators.required]),
    plantAreaId: new FormControl(this.formData.plantAreaId, [
      Validators.required,
    ]),
  });

  ngOnInit() {
    this.companies = companies;
    this.plants = plants;
    this.plantAreas = plantareas;
    this.changeControlState(['plant', 'plantArea'], false);
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
      this.changeControlState(['plantArea'], false);
    } else {
      this.resetState();
    }
    if (!this.comboBoxValueChange) {
      this.form.patchValue({ plant: undefined });
      this.form.patchValue({ plantArea: undefined });
    }
  }

  plantChange(plant: Plant) {
    if (plant) {
      this.form.patchValue({ plantId: plant.id });
      this.filteredPlantAreas = this.plantAreas.filter(
        (plantArea) => plantArea.plantId === plant.id
      );
      this.changeControlState(['plantArea'], true);
    } else {
      this.filteredPlantAreas = [];
      this.changeControlState(['plantArea'], false);
    }
    if (!this.comboBoxValueChange)
      this.form.patchValue({ plantArea: undefined });
  }

  plantAreaChange(value: PlantArea) {
    this.form.patchValue({ plantAreaId: value.id });
  }

  yearChange(value: Date) {
    this.form.patchValue({ year: value.getFullYear() });
  }

  resetState() {
    this.changeControlState(['plant', 'plantArea'], false);
    this.filteredPlants = [];
    this.filteredPlantAreas = [];
  }
}
