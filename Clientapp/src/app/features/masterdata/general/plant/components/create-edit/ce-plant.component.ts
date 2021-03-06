import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/features/masterdata/general/company/models/company.model';
import { Plant } from 'src/app/features/masterdata/general/plant/models/plant.model';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/createedit.component';
import { CompanyService } from '../../../company/services/company.service';

@Component({
  selector: 'ce-plant',
  templateUrl: './ce-plant.component.html',
  styleUrls: ['../../../../../../styles/dialog.css'],
})
export class CreateEditPlantComponent
  extends CreateEditComponent<Plant>
  implements OnInit
{
  companies: Company[] = [];

  form: FormGroup = new FormGroup({
    id: new FormControl(this.formData.id),
    code: new FormControl(this.formData.code, [Validators.required]),
    location: new FormControl(this.formData.location, [Validators.required]),
    company: new FormControl(this.formData.company, [Validators.required]),
    companyId: new FormControl(this.formData.companyId, [Validators.required]),
  });

  constructor(private companyService: CompanyService) {
    super();
  }

  ngOnInit() {
    this.companyService.getCompanies().subscribe((companies) => {
      this.companies = companies;
    });
  }

  companyChange(value: Company) {
    if (value) this.form.patchValue({ companyId: value.id });
  }
}
