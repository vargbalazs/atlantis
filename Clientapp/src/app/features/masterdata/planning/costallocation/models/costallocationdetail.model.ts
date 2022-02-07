import { CostCenter } from '../../costcenter/models/costcenter.model';
import { CostAllocation } from './costallocation.model';

export class CostAllocationDetail {
  constructor(
    public id?: number,
    public costAllocId?: number,
    public costAlloc?: CostAllocation,
    public baseCostCenterId?: number,
    public baseCostCenter?: CostCenter,
    public recCostCenterId?: number,
    public recCostCenter?: CostCenter,
    public recCostCenterName?: string,
    public percent?: number,
    public capacity?: number,
    public index?: number
  ) {}
}
