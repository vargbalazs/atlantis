import { Component, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HcPlanningItem } from '../../models/hcplanningitem.model';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/createedit.component';
import { CostGroup } from 'src/app/features/masterdata/planning/costgroup/models/costgroup.model';
import { Job } from 'src/app/features/masterdata/general/job/models/job.model';
import { FilterEntity } from 'src/app/shared/models/filter.model';

@Component({
  selector: 'ce-planningitem',
  templateUrl: './ce-planningitem.component.html',
  styleUrls: [
    '../../../../../styles/dialog.css',
    './ce-planningitem.component.css',
  ],
})
export class CreateEditPlanningItemComponent
  extends CreateEditComponent<HcPlanningItem>
  implements OnChanges
{
  @Input() costGroups!: CostGroup[];
  @Input() jobs!: Job[];
  @Input() filterEntity!: FilterEntity;

  form: FormGroup = new FormGroup({
    id: new FormControl(this.formData.id),
    companyId: new FormControl(this.formData.companyId, [Validators.required]),
    plantId: new FormControl(this.formData.plantId, [Validators.required]),
    year: new FormControl(this.formData.year, [Validators.required]),
    costCenterId: new FormControl(this.formData.costCenterId, [
      Validators.required,
    ]),
    costAccTypeId: new FormControl(this.formData.costAccTypeId, [
      Validators.required,
    ]),
    costGroup: new FormControl(this.formData.costGroup, [Validators.required]),
    costGroupId: new FormControl(this.formData.costGroupId, [
      Validators.required,
    ]),
    departmentName: new FormControl(
      { value: this.formData.job?.department?.name, disabled: true },
      [Validators.required]
    ),
    job: new FormControl(this.formData.job, [Validators.required]),
    jobId: new FormControl(this.formData.jobId, [Validators.required]),
    p1: new FormControl(this.formData.p1, [Validators.required]),
    p2: new FormControl(this.formData.p2, [Validators.required]),
    p3: new FormControl(this.formData.p3, [Validators.required]),
    p4: new FormControl(this.formData.p4, [Validators.required]),
    p5: new FormControl(this.formData.p5, [Validators.required]),
    p6: new FormControl(this.formData.p6, [Validators.required]),
    p7: new FormControl(this.formData.p7, [Validators.required]),
    p8: new FormControl(this.formData.p8, [Validators.required]),
    p9: new FormControl(this.formData.p9, [Validators.required]),
    p10: new FormControl(this.formData.p10, [Validators.required]),
    p11: new FormControl(this.formData.p11, [Validators.required]),
    p12: new FormControl(this.formData.p12, [Validators.required]),
    comment: new FormControl(this.formData.comment),
    task: new FormControl(this.formData.task),
    taskId: new FormControl(this.formData.taskId),
  });

  periods: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  ngOnChanges() {
    if (this.editMode) {
      // we have to call this manually, because the kendo combobox control doesn't call the valuechange event,
      // if the value is changed programmatically
      this.costGroupChange(this.form.get('costGroup')?.value);
      this.jobChange(this.form.get('job')?.value);
    }
  }

  costGroupChange(value: CostGroup) {
    if (value) {
      this.form.patchValue({ costGroupId: value.id });
      this.form.patchValue({ companyId: this.filterEntity.companyId });
      this.form.patchValue({ plantId: this.filterEntity.plantId });
      this.form.patchValue({ year: this.filterEntity.year?.getFullYear() });
      this.form.patchValue({ costCenterId: this.filterEntity.costCenterId });
      this.form.patchValue({ costAccTypeId: this.filterEntity.costAccTypeId });
    }
  }

  jobChange(value: Job) {
    if (value) {
      this.form.patchValue({ jobId: value.id });
      this.form.patchValue({ departmentName: value.department?.name });
    } else {
      this.form.patchValue({ departmentName: '' });
    }
  }
}
