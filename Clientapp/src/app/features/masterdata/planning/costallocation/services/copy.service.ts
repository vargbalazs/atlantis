import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CopyEntity } from '../../../../../shared/models/copy.model';

@Injectable()
export class CopyService {
  constructor(private http: HttpClient) {}

  copy(copyAllocation: CopyEntity) {
    return this.http.post(
      'api/masterdata/planning/copyallocation',
      copyAllocation
    );
  }

  allocationsAlreadyExist(copyAllocation: CopyEntity) {
    return this.http.post<boolean>(
      'api/masterdata/planning/allocationalreadyexist',
      copyAllocation
    );
  }
}
