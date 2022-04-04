import { Injectable } from '@angular/core';
import { CostAllocation } from '../models/costallocation.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';
import { CostAllocationDetail } from '../models/costallocationdetail.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class CostAllocationService implements IRepository<CostAllocation> {
  constructor(private http: HttpClient) {}

  add(costallocation: CostAllocation) {
    return this.http.post<number>(
      `${environment.apiUrl}/api/masterdata/planning/costallocation`,
      costallocation
    );
  }

  update(costallocation: CostAllocation) {
    return this.http.patch<number>(
      `${environment.apiUrl}/api/masterdata/planning/costallocation`,
      costallocation
    );
  }

  delete(id: number) {
    return this.http.delete<number>(
      `${environment.apiUrl}/api/masterdata/planning/costallocation/${id}`
    );
  }

  saveAllocationDetails(details: CostAllocationDetail[]) {
    return this.http.post(
      `${environment.apiUrl}/api/masterdata/planning/costallocationdetails`,
      details
    );
  }

  getCostAllocations() {
    return this.http.get<CostAllocation[]>(
      `${environment.apiUrl}/api/masterdata/planning/costallocation`
    );
  }

  getCostAllocDetails(costAllocId: number) {
    return this.http.get<CostAllocationDetail[]>(
      `${environment.apiUrl}/api/masterdata/planning/costallocationdetails/${costAllocId}`
    );
  }
}
