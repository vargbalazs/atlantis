import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/features/masterdata/general/company/models/company.model';
import { Plant } from 'src/app/features/masterdata/general/plant/models/plant.model';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/createedit.component';
import { Provk } from '../../models/provk.model';

@Component({
  selector: 'ce-provk',
  templateUrl: './ce-provk.component.html',
  styleUrls: ['../../../../../styles/dialog.css'],
})
export class CreateEditProvkComponent
  extends CreateEditComponent<Provk>
  implements OnInit, OnChanges
{
  form: FormGroup = new FormGroup({
    id: new FormControl(this.formData.id),
    companyId: new FormControl(this.formData.companyId, [Validators.required]),
    company: new FormControl(this.formData.company, [Validators.required]),
    plantId: new FormControl(this.formData.plantId, [Validators.required]),
    plant: new FormControl(this.formData.plant, [Validators.required]),
    year: new FormControl(this.formData.year, [Validators.required]),
    month: new FormControl(this.formData.month, [Validators.required]),
    period: new FormControl(this.formData.period, [Validators.required]),
    versions: new FormControl(this.formData.versions, [Validators.required]),
  });

  @Input() company!: Company;
  @Input() plant!: Plant;
  @Input() minDate!: Date;
  @Input() maxDate!: Date;

  ngOnInit() {}

  ngOnChanges() {
    if (this.editMode) {
      // we have to call this manually, because the kendo combobox control doesn't call the valuechange event,
      // if the value is changed programmatically
      const date = new Date(
        +this.form.get('year')!.value,
        +this.form.get('month')!.value - 1,
        1
      );
      this.form.patchValue({ period: date });
      this.periodChange(date);
    }
  }

  periodChange(value: Date) {
    this.form.patchValue({ year: value.getFullYear() });
    this.form.patchValue({ month: value.getMonth() + 1 });
    this.form.patchValue({ companyId: this.company.id });
    this.form.patchValue({ plantId: this.plant.id });
    this.form.patchValue({ company: this.company });
    this.form.patchValue({ plant: this.plant });
    this.form.patchValue({
      period: new Date(value.getFullYear(), value.getMonth(), 1),
    });
  }
}
