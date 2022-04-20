import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PlantPlOverview } from '../models/plantploverview.model';

@Injectable()
export class PlantPlReportService {
  constructor(private http: HttpClient) {}

  getPlantPl(
    year: number,
    month: number,
    costAccTypeId: number,
    plantId: number,
    companyId: number
  ) {
    let filterCrit = {
      year: year,
      month: month,
      costAccTypeId: costAccTypeId,
      plantId: plantId,
      companyId: companyId,
    };
    return this.http.get<PlantPlOverview[]>(
      `${environment.apiUrl}/api/plantresult/reports/plantpl`,
      { params: filterCrit }
    );
  }
}
