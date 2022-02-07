import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FileRestrictions } from '@progress/kendo-angular-upload';

@Component({
  selector: 'file',
  templateUrl: './file.component.html',
})
export class FileComponent {
  fileRestrictions: FileRestrictions = {
    allowedExtensions: ['.xlsx'],
  };

  @Input() file!: FormGroup;
}
