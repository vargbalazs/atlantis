import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FileInfo } from '@progress/kendo-angular-upload';

@Component({
  selector: 'upload-file',
  templateUrl: './upload-file.component.html',
})
export class UploadFileComponent implements OnInit {
  fileArray!: FileInfo[];

  @Input() set form(formGroup: FormGroup) {
    this.fileArray = formGroup.get('file.fileName')?.value;
  }

  ngOnInit() {
    // this.fileArray = this.form.get('file.fileName')?.value;
    // console.log(this.fileArray);
  }
}
