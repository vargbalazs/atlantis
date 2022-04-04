import { Injectable } from '@angular/core';
import { Frc } from '../models/frc.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class FrcService implements IRepository<Frc> {
  constructor(private http: HttpClient) {}

  add(frc: Frc) {
    return this.http.post<number>(
      `${environment.apiUrl}/api/forecast/frc`,
      frc
    );
  }

  update(frc: Frc) {
    return this.http.patch<number>(
      `${environment.apiUrl}/api/forecast/frc`,
      frc
    );
  }

  delete(id: number) {
    return this.http.delete<number>(
      `${environment.apiUrl}/api/forecast/frc/${id}`
    );
  }

  getFrcs(
    companyId: number,
    plantId: number,
    year: number,
    costAccTypeId: number
  ) {
    let filterCrit = {
      companyId: companyId,
      plantId: plantId,
      year: year,
      costAccTypeId: costAccTypeId,
    };
    return this.http.get<Frc[]>(`${environment.apiUrl}/api/forecast/frc`, {
      params: filterCrit,
    });
  }
}
