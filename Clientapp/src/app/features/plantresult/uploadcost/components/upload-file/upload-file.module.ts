import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFileComponent } from './upload-file.component';
import { UploadModule } from '@progress/kendo-angular-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UploadFileComponent],
  imports: [CommonModule, UploadModule, ReactiveFormsModule, FormsModule],
  providers: [],
  exports: [UploadFileComponent],
})
export class UploadFileModule {}
