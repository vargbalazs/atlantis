import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  ErrorEvent,
  FileInfo,
  SuccessEvent,
  UploadComponent,
  UploadEvent,
} from '@progress/kendo-angular-upload';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
})
export class UploadFileComponent implements OnInit {
  @Input() form!: FormGroup;
  @ViewChild('upload') upload!: UploadComponent;
  @Output('uploadFinished') uploadFinished = new EventEmitter();
  fileArray!: FileInfo[];
  uploadUrl!: string;

  constructor(
    private uploadService: UploadService,
    private customNotificationService: CustomNotificationService
  ) {}

  ngOnInit() {
    this.fileArray = <FileInfo[]>this.form.get('file.fileName')?.value;
    this.uploadUrl = this.uploadService.uploadUrl;
  }

  uploadEventHandler(e: UploadEvent) {
    e.data = {
      companyId: this.form.get('entity.companyId')!.value,
      plantId: this.form.get('entity.plantId')!.value,
      year: (<Date>this.form.get('entity.month')!.value).getFullYear(),
      month: (<Date>this.form.get('entity.month')!.value).getMonth() + 1,
    };
  }

  uploadFile() {
    this.upload.uploadFiles();
  }

  success(e: SuccessEvent) {
    this.uploadFinished.emit();
    this.customNotificationService.showNotification(
      'A fájl sikeresen feltöltve',
      3000,
      'success'
    );
  }

  errorEventHandler(e: any) {
    this.uploadFinished.emit();
  }
}
