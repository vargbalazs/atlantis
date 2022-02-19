import { Component, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CostPlanningItem } from '../../models/costplanningitem.model';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/createedit.component';
import { CostAccount } from 'src/app/features/masterdata/planning/costaccount/models/costaccount.model';
import { Currency } from '../../models/currency.model';
import { currencies } from '../planningitems/currencies';
import { CostGroup } from 'src/app/features/masterdata/planning/costgroup/models/costgroup.model';
import { FilterEntity } from 'src/app/shared/models/filter.model';
import { Task } from 'src/app/shared/models/task.model';

@Component({
  selector: 'ce-planningitem',
  templateUrl: './ce-planningitem.component.html',
  styleUrls: [
    '../../../../../styles/dialog.css',
    './ce-planningitem.component.css',
  ],
})
export class CreateEditPlanningItemComponent
  extends CreateEditComponent<CostPlanningItem>
  implements OnChanges
{
  @Input() costAccounts!: CostAccount[];
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
    costAccountId: new FormControl(this.formData.costAccountId, [
      Validators.required,
    ]),
    costAccount: new FormControl(this.formData.costAccount, [
      Validators.required,
    ]),
    costGroup: new FormControl(this.formData.costGroup, [Validators.required]),
    costGroupId: new FormControl(this.formData.costGroupId, [
      Validators.required,
    ]),
    costGroupName: new FormControl(
      { value: this.formData.costGroup?.name, disabled: true },
      [Validators.required]
    ),
    itemName: new FormControl(this.formData.itemName, [Validators.required]),
    amountInCurrency: new FormControl(this.formData.amountInCurrency, [
      Validators.required,
    ]),
    amount: new FormControl(this.formData.amount, [Validators.required]),
    currency: new FormControl(this.formData.currency, [Validators.required]),
    currencyId: new FormControl(this.formData.currencyId, [
      Validators.required,
    ]),
    // 0 - equal / 1 - individual
    distribution: new FormControl(this.formData.distribution, [
      Validators.required,
    ]),
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
  });

  periods: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  currencies: Currency[] = currencies;

  ngOnChanges() {
    if (this.editMode) {
      // we have to call this manually, because the kendo combobox control doesn't call the valuechange event,
      // if the value is changed programmatically
      this.costAccountChange(this.form.get('costAccount')?.value);
    } else {
      this.form.patchValue({ distribution: 0 });
      this.form.patchValue({ task: new Task(0, 0, '', 0, 0) });
    }
  }

  costAccountChange(value: CostAccount) {
    if (value) {
      // costGroup has it's initial value, if we are in edit mode
      const costGroup = <CostGroup>this.form.get('costGroup')?.value;
      this.form.patchValue({ costAccountId: value.id });
      this.form.patchValue({
        costGroup: value.costGroup ? value.costGroup : costGroup,
      });
      this.form.patchValue({
        costGroupId: value.costGroup ? value.costGroupId : costGroup.id,
      });
      this.form.patchValue({
        costGroupName: value.costGroup ? value.costGroup?.name : costGroup.name,
      });
      this.form.patchValue({ companyId: this.filterEntity.companyId });
      this.form.patchValue({ plantId: this.filterEntity.plantId });
      this.form.patchValue({ year: this.filterEntity.year?.getFullYear() });
      this.form.patchValue({ costCenterId: this.filterEntity.costCenterId });
      this.form.patchValue({ costAccTypeId: this.filterEntity.costAccTypeId });
    } else {
      this.form.patchValue({ costGroupName: '' });
    }
  }

  currencyChange(value: Currency) {
    if (value) this.form.patchValue({ currencyId: value.id });
  }

  distChange(value: string) {
    for (let i = 1; i <= 12; i++) {
      this.form.get(`p${i}`)?.reset();
      this.form.patchValue({ [`p${i}`]: 0 });
    }
    // equal dist
    if (!value) {
      this.setMonthlyValues(+this.form.get('amount')?.value);
    }
  }

  amountChange(value: string) {
    // set the monthly values if the dist mode is equal
    if (!+this.form.get('distribution')?.value) {
      this.setMonthlyValues(+value);
    }
  }

  private setMonthlyValues(amount: number) {
    for (let i = 1; i <= 12; i++) {
      this.form.patchValue({
        [`p${i}`]: amount / 12,
      });
    }
  }
}
