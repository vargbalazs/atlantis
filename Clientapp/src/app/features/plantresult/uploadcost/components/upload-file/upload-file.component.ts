import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FileInfo } from '@progress/kendo-angular-upload';

@Component({
  selector: 'upload-file',
  templateUrl: './upload-file.component.html',
})
export class UploadFileComponent implements OnInit {
  @Input() form!: FormGroup;

  fileArray: FileInfo[] = [];

  ngOnInit() {
    this.fileArray.push(this.form.get('file.fileName')?.value[0]);
  }
}
