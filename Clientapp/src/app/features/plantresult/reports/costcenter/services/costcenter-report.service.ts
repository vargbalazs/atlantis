import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CostOverview } from '../models/costoverview.model';

@Injectable()
export class CostCenterReportService {
  constructor(private http: HttpClient) {}

  getCostCenterOverview(
    year: number,
    month: number,
    costAccTypeId: number,
    plantId: number
  ) {
    let filterCrit = {
      year: year,
      month: month,
      costAccTypeId: costAccTypeId,
      plantId: plantId,
    };
    return this.http.get<CostOverview[]>(
      `${environment.apiUrl}/api/plantresult/reports/costcenteroverview`,
      { params: filterCrit }
    );
  }

  getCostCenterDetails(
    year: number,
    month: number,
    costCenterId: number,
    costAccTypeId: number,
    plantId: number,
    companyId: number
  ) {
    let filterCrit = {
      year: year,
      month: month,
      costCenterId: costCenterId,
      costAccTypeId: costAccTypeId,
      plantId: plantId,
      companyId: companyId,
    };
    return this.http.get<CostOverview[]>(
      `${environment.apiUrl}/api/plantresult/reports/costcenterdetails`,
      { params: filterCrit }
    );
  }
}
