import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { companies } from 'src/app/features/masterdata/general/company/components/list/sampledata';
import { plants } from '../../../features/masterdata/general/plant/components/list/sampledata';
import { Company } from 'src/app/features/masterdata/general/company/models/company.model';
import { Plant } from 'src/app/features/masterdata/general/plant/models/plant.model';
import { CopyEntity } from '../../models/copy.model';
import { SubmitFormComponent } from 'src/app/shared/components/submitform/submitform.component';

@Component({
  selector: 'copy-entity',
  templateUrl: './copy.component.html',
  styleUrls: ['../../../styles/dialog.css', './copy.component.css'],
})
export class CopyComponent
  extends SubmitFormComponent<CopyEntity>
  implements OnInit, OnChanges
{
  companies: Company[] = [];
  plants: Plant[] = [];
  filteredPlants: Plant[] = [];
  isMsgDialog = true;
  dialogType = 'danger';

  formVisible = false;

  form: FormGroup = new FormGroup({
    sourceYear: new FormControl(this.formData.sourceYear, [
      Validators.required,
    ]),
    targetYear: new FormControl(this.formData.targetYear, [
      Validators.required,
    ]),
    company: new FormControl(this.formData.company, [Validators.required]),
    plant: new FormControl(this.formData.plant, [Validators.required]),
    companyId: new FormControl(this.formData.companyId, [Validators.required]),
    plantId: new FormControl(this.formData.plantId, [Validators.required]),
  });

  ngOnInit() {
    this.companies = companies;
    this.plants = plants;
    this.changeControlState(['plant'], false);
    this.checkFunctionsOnSaveClient.push(this.yearsAreNotTheSame);
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
  }

  plantChange(value: Plant) {
    this.form.patchValue({ plantId: value.id });
  }

  resetState() {
    this.changeControlState(['plant'], false);
    this.filteredPlants = [];
  }

  yearsAreNotTheSame(copyCostCenter: CopyEntity): boolean {
    if (
      copyCostCenter.sourceYear?.getFullYear() ===
      copyCostCenter.targetYear?.getFullYear()
    ) {
      this.msgDialogService.showDialog(
        'Másolás',
        'A forrásév és a célév nem lehet ugyanaz',
        [{ text: 'Ok' }]
      );
      return false;
    } else {
      return true;
    }
  }
}
