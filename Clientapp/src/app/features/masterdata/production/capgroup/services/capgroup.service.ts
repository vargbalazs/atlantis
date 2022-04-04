import { Injectable } from '@angular/core';
import { CapGroup } from '../models/capgroup.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class CapGroupService implements IRepository<CapGroup> {
  constructor(private http: HttpClient) {}

  add(capgroup: CapGroup) {
    return this.http.post<number>(
      `${environment.apiUrl}/api/masterdata/production/capgroup`,
      capgroup
    );
  }

  update(capgroup: CapGroup) {
    return this.http.patch<number>(
      `${environment.apiUrl}/api/masterdata/production/capgroup`,
      capgroup
    );
  }

  delete(id: number) {
    return this.http.delete<number>(
      `${environment.apiUrl}/api/masterdata/production/capgroup/${id}`
    );
  }

  getCapGroups() {
    return this.http.get<CapGroup[]>(
      `${environment.apiUrl}/api/masterdata/production/capgroup`
    );
  }
}
