import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class UploadService {
  uploadUrl = `${environment.apiUrl}/api/plantresult/uploadbookings`;
}
