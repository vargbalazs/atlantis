import { Injectable } from '@angular/core';
import { Provk } from '../models/provk.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';
import { ProvkVersion } from '../models/provkversion.model';
import { ProvkDetail } from '../models/provkdetail.model';
import { SalesDetail } from '../models/salesdetail.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProvkService implements IRepository<Provk> {
  constructor(private http: HttpClient) {}

  add(provk: Provk) {
    return this.http.post<number>(
      `${environment.apiUrl}/api/forecast/provk`,
      provk
    );
  }

  update(provk: Provk) {
    return this.http.patch<number>(
      `${environment.apiUrl}/api/forecast/provk`,
      provk
    );
  }

  delete(id: number) {
    return this.http.delete<number>(
      `${environment.apiUrl}/api/forecast/provk/${id}`
    );
  }

  getProvks(companyId: number, plantId: number, year: number) {
    let filterCrit = { companyId: companyId, plantId: plantId, year: year };
    return this.http.get<Provk[]>(`${environment.apiUrl}/api/forecast/provk`, {
      params: filterCrit,
    });
  }

  getProvkVersions(provkId: number) {
    return this.http.get<ProvkVersion[]>(
      `${environment.apiUrl}/api/forecast/provk/${provkId}/versions`
    );
  }

  getProvkDetails(
    provkId: number,
    year: number,
    month: number,
    version: number,
    capTypeId: number,
    plantId: number
  ) {
    let filterCrit = {
      provkId: provkId,
      year: year,
      month: month,
      version: version,
      capTypeId: capTypeId,
      plantId: plantId,
    };
    return this.http.get<ProvkDetail[]>(
      `${environment.apiUrl}/api/forecast/provk/provkdetail`,
      {
        params: filterCrit,
      }
    );
  }

  getSalesDetails(
    provkId: number,
    year: number,
    month: number,
    version: number,
    plantId: number
  ) {
    let filterCrit = {
      provkId: provkId,
      year: year,
      month: month,
      version: version,
      plantId: plantId,
    };
    return this.http.get<SalesDetail[]>(
      `${environment.apiUrl}/api/forecast/provk/salesdetail`,
      {
        params: filterCrit,
      }
    );
  }

  updateProvkDetails(provkDetails: ProvkDetail[]) {
    return this.http.post(
      `${environment.apiUrl}/api/forecast/provk/provkdetail`,
      provkDetails
    );
  }

  updateSalesDetails(salesDetails: SalesDetail[]) {
    return this.http.post(
      `${environment.apiUrl}/api/forecast/provk/salesdetail`,
      salesDetails
    );
  }

  checkMonth(provk: Provk) {
    let crit = {
      plantId: provk.plantId!,
      year: provk.year!,
      month: provk.month!,
    };
    return this.http.get<boolean>(
      `${environment.apiUrl}/api/forecast/provk/checkmonth`,
      {
        params: crit,
      }
    );
  }

  hasVersions(provk: Provk) {
    let crit = {
      provkId: provk.id!,
    };
    return this.http.get<boolean>(
      `${environment.apiUrl}/api/forecast/provk/hasversions`,
      {
        params: crit,
      }
    );
  }

  getNextVersionNumber(provkId: number) {
    return this.http.get<number>(
      `${environment.apiUrl}/api/forecast/provk/nextversion/${provkId}`
    );
  }

  addNewVersion(provkversion: ProvkVersion) {
    return this.http.post<number>(
      `${environment.apiUrl}/api/forecast/provk/newversion`,
      provkversion
    );
  }
}
