import { Injectable } from '@angular/core';
import { CapType } from '../models/captype.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class CapTypeService implements IRepository<CapType> {
  constructor(private http: HttpClient) {}

  add(captype: CapType) {
    return this.http.post<number>(
      `${environment.apiUrl}/api/masterdata/production/captype`,
      captype
    );
  }

  update(captype: CapType) {
    return this.http.patch<number>(
      `${environment.apiUrl}/api/masterdata/production/captype`,
      captype
    );
  }

  delete(id: number) {
    return this.http.delete<number>(
      `${environment.apiUrl}/api/masterdata/production/captype/${id}`
    );
  }

  getCapTypesByPlantId(plantId: number) {
    return this.http.get<CapType[]>(
      `${environment.apiUrl}/api/masterdata/production/captype`,
      {
        params: { plantId: plantId },
      }
    );
  }

  getCapTypes() {
    return this.http.get<CapType[]>(
      `${environment.apiUrl}/api/masterdata/production/captype`
    );
  }
}
