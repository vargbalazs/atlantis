import { Injectable } from '@angular/core';
import { CapUnit } from '../models/capunit.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class CapUnitService implements IRepository<CapUnit> {
  constructor(private http: HttpClient) {}

  add(capunit: CapUnit) {
    return this.http.post<number>(
      `${environment.apiUrl}/api/masterdata/production/capunit`,
      capunit
    );
  }

  update(capunit: CapUnit) {
    return this.http.patch<number>(
      `${environment.apiUrl}/api/masterdata/production/capunit`,
      capunit
    );
  }

  delete(id: number) {
    return this.http.delete<number>(
      `${environment.apiUrl}/api/masterdata/production/capunit/${id}`
    );
  }

  getCapUnits() {
    return this.http.get<CapUnit[]>(
      `${environment.apiUrl}/api/masterdata/production/capunit`
    );
  }
}
