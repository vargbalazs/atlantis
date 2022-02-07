import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CopyEntity } from '../../../../../shared/models/copy.model';

@Injectable()
export class CopyService {
  constructor(private http: HttpClient) {}

  copy(copyCostAccount: CopyEntity) {
    return this.http.post(
      'api/masterdata/planning/copycostaccount',
      copyCostAccount
    );
  }

  costCentersAlreadyExist(copycostaccount: CopyEntity) {
    return this.http.post<boolean>(
      'api/masterdata/planning/ccalreadyexist',
      copycostaccount
    );
  }
}
