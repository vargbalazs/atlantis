import { Injectable } from '@angular/core';
import { CostAllocation } from '../models/costallocation.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';
import { CostAllocationDetail } from '../models/costallocationdetail.model';

@Injectable()
export class CostAllocationService implements IRepository<CostAllocation> {
  constructor(private http: HttpClient) {}

  add(costallocation: CostAllocation) {
    return this.http.post<number>(
      '/api/masterdata/planning/costallocation',
      costallocation
    );
  }

  update(costallocation: CostAllocation) {
    return this.http.patch<number>(
      '/api/masterdata/planning/costallocation',
      costallocation
    );
  }

  delete(id: number) {
    return this.http.delete<number>(
      `/api/masterdata/planning/costallocation/${id}`
    );
  }

  saveAllocationDetails(details: CostAllocationDetail[]) {
    return this.http.post(
      '/api/masterdata/planning/costallocationdetails',
      details
    );
  }
}
