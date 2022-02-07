import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CopyEntity } from '../../../../../shared/models/copy.model';

@Injectable()
export class CopyService {
  constructor(private http: HttpClient) {}

  copy(copyCostCenter: CopyEntity) {
    return this.http.post(
      'api/masterdata/planning/copycostcenter',
      copyCostCenter
    );
  }

  costCentersAlreadyExist(copycostcenter: CopyEntity) {
    return this.http.post<boolean>(
      'api/masterdata/planning/ccalreadyexist',
      copycostcenter
    );
  }
}
