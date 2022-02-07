import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { companies } from 'src/app/features/masterdata/general/company/components/list/sampledata';
import { plants } from '../../../plant/components/list/sampledata';
import { Company } from 'src/app/features/masterdata/general/company/models/company.model';
import { Plant } from 'src/app/features/masterdata/general/plant/models/plant.model';
import { Department } from '../../models/department.model';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/createedit.component';

@Component({
  selector: 'ce-department',
  templateUrl: './ce-department.component.html',
  styleUrls: ['../../../../../../styles/dialog.css'],
})
export class CreateEditDepartmentComponent
  extends CreateEditComponent<Department>
  implements OnInit, OnChanges
{
  companies: Company[] = [];
  plants: Plant[] = [];
  filteredPlants: Plant[] = [];

  form: FormGroup = new FormGroup({
    id: new FormControl(this.formData.id),
    name: new FormControl(this.formData.name, [Validators.required]),
    company: new FormControl(this.formData.company, [Validators.required]),
    plant: new FormControl(this.formData.plant, [Validators.required]),
    plantId: new FormControl(this.formData.plantId, [Validators.required]),
  });

  ngOnInit() {
    this.companies = companies;
    this.plants = plants;
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
      this.filteredPlants = this.plants.filter(
        (plant) => plant.companyId === company.id
      );
      this.changeControlState(['plant'], true);
    } else {
      this.resetState();
    }
    if (!this.comboBoxValueChange) this.form.patchValue({ plant: undefined });
  }

  plantChange(value: Plant) {
    this.form.patchValue({ plantId: value.id });
  }

  resetState() {
    this.changeControlState(['plant'], false);
    this.filteredPlants = [];
  }
}
