import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CopyEntity } from '../../../../../shared/models/copy.model';

@Injectable()
export class CopyService {
  constructor(private http: HttpClient) {}

  copy(copyCapGroup: CopyEntity) {
    return this.http.post(
      'api/masterdata/production/copycapgroup',
      copyCapGroup
    );
  }

  capGroupsAlreadyExist(copyCapGroup: CopyEntity) {
    return this.http.post<boolean>(
      'api/masterdata/production/capgroupsalreadyexist',
      copyCapGroup
    );
  }
}
