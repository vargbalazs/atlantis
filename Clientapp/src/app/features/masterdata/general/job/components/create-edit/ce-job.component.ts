import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { companies } from 'src/app/features/masterdata/general/company/components/list/sampledata';
import { plants } from '../../../plant/components/list/sampledata';
import { departments } from '../../../department/components/list/sampledata';
import { Company } from 'src/app/features/masterdata/general/company/models/company.model';
import { Plant } from 'src/app/features/masterdata/general/plant/models/plant.model';
import { Department } from 'src/app/features/masterdata/general/department/models/department.model';
import { Job } from '../../models/job.model';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/createedit.component';

@Component({
  selector: 'ce-job',
  templateUrl: './ce-job.component.html',
  styleUrls: ['../../../../../../styles/dialog.css'],
})
export class CreateEditJobComponent
  extends CreateEditComponent<Job>
  implements OnInit, OnChanges
{
  companies: Company[] = [];
  plants: Plant[] = [];
  departments: Department[] = [];
  filteredPlants: Plant[] = [];
  filteredDepartments: Department[] = [];

  form: FormGroup = new FormGroup({
    id: new FormControl(this.formData.id),
    name: new FormControl(this.formData.name, [Validators.required]),
    descr: new FormControl(this.formData.descr),
    company: new FormControl(this.formData.company, [Validators.required]),
    plant: new FormControl(this.formData.plant, [Validators.required]),
    department: new FormControl(this.formData.department, [
      Validators.required,
    ]),
    depId: new FormControl(this.formData.depId, [Validators.required]),
  });

  ngOnInit() {
    this.companies = companies;
    this.plants = plants;
    this.departments = departments;
    this.changeControlState(['plant', 'department'], false);
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
      this.filteredPlants = this.plants.filter(
        (plant) => plant.companyId === company.id
      );
      this.changeControlState(['plant'], true);
      this.changeControlState(['department'], false);
    } else {
      this.resetState();
    }
    if (!this.comboBoxValueChange) {
      this.form.patchValue({ plant: undefined });
      this.form.patchValue({ department: undefined });
    }
  }

  plantChange(plant: Plant) {
    if (plant) {
      this.filteredDepartments = this.departments.filter(
        (department) => department.plantId === plant.id
      );
      this.changeControlState(['department'], true);
    } else {
      this.filteredDepartments = [];
      this.changeControlState(['department'], false);
    }
    if (!this.comboBoxValueChange)
      this.form.patchValue({ department: undefined });
  }

  departmentChange(value: Department) {
    this.form.patchValue({ depId: value.id });
  }

  resetState() {
    this.changeControlState(['plant', 'department'], false);
    this.filteredPlants = [];
    this.filteredDepartments = [];
  }
}
