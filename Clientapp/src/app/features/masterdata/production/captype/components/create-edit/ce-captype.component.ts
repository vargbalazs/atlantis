import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { companies } from 'src/app/features/masterdata/general/company/components/list/sampledata';
import { plants } from '../../../../general/plant/components/list/sampledata';
import { Company } from 'src/app/features/masterdata/general/company/models/company.model';
import { Plant } from 'src/app/features/masterdata/general/plant/models/plant.model';
import { CapType } from '../../models/captype.model';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/createedit.component';

@Component({
  selector: 'ce-captype',
  templateUrl: './ce-captype.component.html',
  styleUrls: ['../../../../../../styles/dialog.css'],
})
export class CreateEditCapTypeComponent
  extends CreateEditComponent<CapType>
  implements OnInit, OnChanges
{
  companies: Company[] = [];
  plants: Plant[] = [];
  filteredPlants: Plant[] = [];

  form: FormGroup = new FormGroup({
    id: new FormControl(this.formData.id),
    capType: new FormControl(this.formData.capType, [Validators.required]),
    company: new FormControl(this.formData.company, [Validators.required]),
    plant: new FormControl(this.formData.plant, [Validators.required]),
    companyId: new FormControl(this.formData.companyId, [Validators.required]),
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
      this.form.patchValue({ companyId: company.id });
      this.filteredPlants = this.plants.filter(
        (plant) => plant.companyId === company.id
      );
      this.changeControlState(['plant'], true);
    } else {
      this.resetState();
    }
    if (!this.comboBoxValueChange) {
      this.form.patchValue({ plant: undefined });
    }
  }

  plantChange(plant: Plant) {
    if (plant) this.form.patchValue({ plantId: plant.id });
  }

  resetState() {
    this.changeControlState(['plant'], false);
    this.filteredPlants = [];
  }
}
