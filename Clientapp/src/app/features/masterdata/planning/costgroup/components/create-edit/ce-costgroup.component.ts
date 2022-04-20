import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/features/masterdata/general/company/models/company.model';
import { CompanyService } from 'src/app/features/masterdata/general/company/services/company.service';
import { CostGroup } from 'src/app/features/masterdata/planning/costgroup/models/costgroup.model';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/createedit.component';

@Component({
  selector: 'ce-costgroup',
  templateUrl: './ce-costgroup.component.html',
  styleUrls: ['../../../../../../styles/dialog.css'],
})
export class CreateEditCostGroupComponent
  extends CreateEditComponent<CostGroup>
  implements OnInit
{
  companies: Company[] = [];

  form: FormGroup = new FormGroup({
    id: new FormControl(this.formData.id),
    name: new FormControl(this.formData.name, [Validators.required]),
    rowIndex: new FormControl(this.formData.rowIndex, [
      Validators.required,
      Validators.pattern('[0-9]*'),
    ]),
    usedForPersPlanning: new FormControl(this.formData.usedForPersPlanning),
    ohterPlantCost: new FormControl(this.formData.rowIndex),
    directWagesCost: new FormControl(this.formData.rowIndex),
    company: new FormControl(this.formData.company, [Validators.required]),
    companyId: new FormControl(this.formData.companyId, [Validators.required]),
  });

  constructor(private companyService: CompanyService) {
    super();
  }

  ngOnInit() {
    this.companyService
      .getCompanies()
      .subscribe((companies) => (this.companies = companies));
  }

  companyChange(value: Company) {
    this.form.patchValue({ companyId: value.id });
  }
}
