import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/features/masterdata/general/company/models/company.model';
import { Plant } from 'src/app/features/masterdata/general/plant/models/plant.model';
import { CostAccountingType } from 'src/app/features/masterdata/planning/costacctype/models/costacctype.model';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/createedit.component';
import { Frc } from '../../models/frc.model';

@Component({
  selector: 'ce-frc',
  templateUrl: './ce-frc.component.html',
  styleUrls: ['../../../../../styles/dialog.css'],
})
export class CreateEditFrcComponent
  extends CreateEditComponent<Frc>
  implements OnInit, OnChanges
{
  form: FormGroup = new FormGroup({
    id: new FormControl(this.formData.id),
    companyId: new FormControl(this.formData.companyId, [Validators.required]),
    company: new FormControl(this.formData.company, [Validators.required]),
    plantId: new FormControl(this.formData.plantId, [Validators.required]),
    plant: new FormControl(this.formData.plant, [Validators.required]),
    costAccTypeId: new FormControl(this.formData.costAccTypeId, [
      Validators.required,
    ]),
    costAccType: new FormControl(this.formData.costAccType, [
      Validators.required,
    ]),
    year: new FormControl(this.formData.year, [Validators.required]),
    version: new FormControl(this.formData.version, [Validators.required]),
    comment: new FormControl(this.formData.comment),
  });

  @Input() company!: Company;
  @Input() plant!: Plant;
  @Input() costAccType!: CostAccountingType;
  @Input() year!: number;

  ngOnInit() {}

  ngOnChanges() {
    if (this.costAccType) {
      this.form.patchValue({ year: this.year });
      this.form.patchValue({ companyId: this.company.id });
      this.form.patchValue({ plantId: this.plant.id });
      this.form.patchValue({ costAccTypeId: this.costAccType.id });
      this.form.patchValue({ company: this.company });
      this.form.patchValue({ plant: this.plant });
      this.form.patchValue({ costAccType: this.costAccType });
    }
  }
}
