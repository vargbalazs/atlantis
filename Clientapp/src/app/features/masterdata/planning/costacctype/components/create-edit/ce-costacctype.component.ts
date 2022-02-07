import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CostAccountingType } from 'src/app/features/masterdata/planning/costacctype/models/costacctype.model';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/createedit.component';

@Component({
  selector: 'ce-costacctype',
  templateUrl: './ce-costacctype.component.html',
  styleUrls: ['../../../../../../styles/dialog.css'],
})
export class CreateEditCostAccountingTypeComponent extends CreateEditComponent<CostAccountingType> {
  form: FormGroup = new FormGroup({
    id: new FormControl(this.formData.id),
    name: new FormControl(this.formData.name, [Validators.required]),
    descr: new FormControl(this.formData.descr, [Validators.required]),
  });
}
