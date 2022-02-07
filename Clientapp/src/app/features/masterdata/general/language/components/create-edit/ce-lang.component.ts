import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Language } from '../../models/language.model';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/createedit.component';

@Component({
  selector: 'ce-language',
  templateUrl: './ce-lang.component.html',
  styleUrls: ['../../../../../../styles/dialog.css'],
})
export class CreateEditLanguageComponent extends CreateEditComponent<Language> {
  form: FormGroup = new FormGroup({
    id: new FormControl(this.formData.id),
    isoCode: new FormControl(this.formData.isoCode, [Validators.required]),
    name: new FormControl(this.formData.name, [Validators.required]),
    defaultLang: new FormControl(this.formData.defaultLang),
  });
}
