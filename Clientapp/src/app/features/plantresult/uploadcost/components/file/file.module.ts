import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { FileComponent } from './file.component';
import { UploadsModule } from '@progress/kendo-angular-upload';

@NgModule({
  declarations: [FileComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputsModule,
    LabelModule,
    UploadsModule,
  ],
  providers: [],
  exports: [FileComponent],
})
export class FileModule {}
