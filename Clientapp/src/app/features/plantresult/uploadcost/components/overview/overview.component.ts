import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'overview',
  templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit {
  @Input() form!: FormGroup;
  monthValue!: string;

  ngOnInit() {
    this.monthValue =
      this.form.get('entity.month')?.value.getFullYear() +
      '.' +
      (+this.form.get('entity.month')?.value.getMonth() + 1)
        .toString()
        .padStart(2, '0');
  }
}
