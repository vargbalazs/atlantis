import { Injectable } from '@angular/core';
import { Provk } from '../models/provk.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';
import { ProvkVersion } from '../models/provkversion.model';
import { ProvkDetail } from '../models/provkdetail.model';
import { SalesDetail } from '../models/salesdetail.model';

@Injectable()
export class ProvkService implements IRepository<Provk> {
  constructor(private http: HttpClient) {}

  add(provk: Provk) {
    return this.http.post<number>('/api/forecast/provk', provk);
  }

  update(provk: Provk) {
    return this.http.patch<number>('/api/forecast/provk', provk);
  }

  delete(id: number) {
    return this.http.delete<number>(`/api/forecast/provk/${id}`);
  }

  getProvks(companyId: number, plantId: number, year: number) {
    let filterCrit = { companyId: companyId, plantId: plantId, year: year };
    return this.http.get<Provk[]>('/api/forecast/provk', {
      params: filterCrit,
    });
  }

  getProvkVersions(provkId: number) {
    return this.http.get<ProvkVersion[]>(
      `/api/forecast/provk/${provkId}/versions`
    );
  }

  getProvkDetails(
    provkId: number,
    year: number,
    month: number,
    version: number,
    capTypeId: number
  ) {
    let filterCrit = {
      provkId: provkId,
      year: year,
      month: month,
      version: version,
      capTypeId: capTypeId,
    };
    return this.http.get<ProvkDetail[]>('/api/forecast/provkdetail', {
      params: filterCrit,
    });
  }

  getSalesDetails(
    provkId: number,
    year: number,
    month: number,
    version: number
  ) {
    let filterCrit = {
      provkId: provkId,
      year: year,
      month: month,
      version: version,
    };
    return this.http.get<SalesDetail[]>('/api/forecast/salesdetail', {
      params: filterCrit,
    });
  }

  updateProvkDetails(provkDetails: ProvkDetail[]) {
    return this.http.post('/api/forecast/provk/savedetails', provkDetails);
  }

  updateSalesDetails(salesDetails: SalesDetail[]) {
    return this.http.post('/api/forecast/provk/savesalesdetails', salesDetails);
  }

  checkMonth(provk: Provk) {
    let crit = {
      year: provk.year!,
      month: provk.month!,
    };
    return this.http.get<boolean>('/api/forecast/provk/checkmonth', {
      params: crit,
    });
  }

  hasVersions(provk: Provk) {
    let crit = {
      year: provk.year!,
      month: provk.month!,
    };
    return this.http.get<boolean>('/api/forecast/provk/hasversions', {
      params: crit,
    });
  }

  getNextVersionNumber(provkId: number) {
    return this.http.get<number>(`/api/forecast/provk/nextversion/${provkId}`);
  }
}
