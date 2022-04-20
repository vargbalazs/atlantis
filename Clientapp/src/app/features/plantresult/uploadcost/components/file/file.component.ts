import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  FileInfo,
  FileRestrictions,
  RemoveEvent,
  SelectEvent,
  UploadComponent,
} from '@progress/kendo-angular-upload';

@Component({
  selector: 'file',
  templateUrl: './file.component.html',
})
export class FileComponent {
  fileRestrictions: FileRestrictions = {
    allowedExtensions: ['.xlsx'],
  };

  @Input() file!: FormGroup;
  @ViewChild('fileName') upload!: UploadComponent;

  select(e: SelectEvent): void {
    // for some reason, the selected file isn't added to the formgroup at first, that's why we need to add it manually
    // but interestingly if we proceed further in the wizard, the value is there, and so we will have now 2 files
    // and we have to delete the second one
    this.file.patchValue({ fileName: e.files });
    this.upload.fileList.files[0].pop();
    if (!(e.files[0].validationErrors === undefined)) {
      this.file.get('fileName')?.setErrors({ invalidExtension: true });
    } else {
      this.file.get('fileName')?.setErrors(null);
    }
  }

  remove(e: RemoveEvent) {
    this.file.patchValue({ fileName: null });
  }
}
