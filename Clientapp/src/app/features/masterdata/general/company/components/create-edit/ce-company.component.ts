import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/features/masterdata/general/company/models/company.model';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/createedit.component';

@Component({
  selector: 'ce-company',
  templateUrl: './ce-company.component.html',
  styleUrls: ['../../../../../../styles/dialog.css'],
})
export class CreateEditCompanyComponent extends CreateEditComponent<Company> {
  form: FormGroup = new FormGroup({
    id: new FormControl(this.formData.id),
    name: new FormControl(this.formData.name, [Validators.required]),
    shortName: new FormControl(this.formData.shortName, [Validators.required]),
  });
}
