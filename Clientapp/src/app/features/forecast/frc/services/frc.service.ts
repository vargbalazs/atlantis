import { Injectable } from '@angular/core';
import { Frc } from '../models/frc.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';
import { environment } from 'src/environments/environment';
import { FrcOtherCost } from '../models/frc-othercost.model';
import { FrcCapacity } from '../models/frc-capacity.model';
import { FrcHc } from '../models/frc-hc.model';
import { FrcSalesProduct } from '../models/frc-salesproduct.model';

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

  getOtherCosts(frcId: number) {
    let filterCrit = { frcId: frcId };
    return this.http.get<FrcOtherCost[]>(
      `${environment.apiUrl}/api/forecast/frc/othercosts`,
      { params: filterCrit }
    );
  }

  addOtherCost(otherCost: FrcOtherCost) {
    return this.http.post<number>(
      `${environment.apiUrl}/api/forecast/frc/othercosts`,
      otherCost
    );
  }

  updateOtherCost(otherCost: FrcOtherCost) {
    return this.http.patch<number>(
      `${environment.apiUrl}/api/forecast/frc/othercosts`,
      otherCost
    );
  }

  deleteOtherCost(id: number) {
    return this.http.delete<number>(
      `${environment.apiUrl}/api/forecast/frc/othercosts/${id}`
    );
  }

  getCapacities(frcId: number, year: number, plantId: number) {
    let filterCrit = { frcId: frcId, year: year, plantId: plantId };
    return this.http.get<FrcCapacity[]>(
      `${environment.apiUrl}/api/forecast/frc/capacity`,
      {
        params: filterCrit,
      }
    );
  }

  saveCapacity(capacity: FrcCapacity) {
    return this.http.post<number>(
      `${environment.apiUrl}/api/forecast/frc/capacity`,
      capacity
    );
  }

  getHc(
    frcId: number,
    depId: number,
    costAccTypeId: number,
    plantId: number,
    year: number
  ) {
    let filterCrit = {
      frcId: frcId,
      depId: depId,
      costAccTypeId: costAccTypeId,
      plantId: plantId,
      year: year,
    };
    return this.http.get<FrcHc[]>(`${environment.apiUrl}/api/forecast/frc/hc`, {
      params: filterCrit,
    });
  }

  saveHc(hc: FrcHc) {
    return this.http.post<number>(
      `${environment.apiUrl}/api/forecast/frc/hc`,
      hc
    );
  }

  getSalesProducts(frcId: number, year: number, plantId: number) {
    let filterCrit = { frcId: frcId, year: year, plantId: plantId };
    return this.http.get<FrcSalesProduct[]>(
      `${environment.apiUrl}/api/forecast/frc/salesproduct`,
      {
        params: filterCrit,
      }
    );
  }

  saveSalesProduct(salesProduct: FrcSalesProduct) {
    return this.http.post<number>(
      `${environment.apiUrl}/api/forecast/frc/salesproduct`,
      salesProduct
    );
  }
}
