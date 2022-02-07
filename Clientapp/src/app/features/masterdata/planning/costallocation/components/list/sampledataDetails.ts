import { CostAllocationDetail } from '../../models/costallocationdetail.model';

export const costAllocationDetails: CostAllocationDetail[] = [
  {
    id: 1,
    costAllocId: 1,
    costAlloc: {
      id: 1,
    },
    baseCostCenterId: 1,
    baseCostCenter: {
      id: 1,
    },
    recCostCenterId: 4,
    recCostCenter: {
      id: 4,
    },
    recCostCenterName: 'Szerszámraktár',
    percent: 20.15,
    capacity: 0,
    index: 1,
  },
  {
    id: 2,
    costAllocId: 1,
    costAlloc: {
      id: 1,
    },
    baseCostCenterId: 1,
    baseCostCenter: {
      id: 1,
    },
    recCostCenterId: 5,
    recCostCenter: {
      id: 5,
    },
    recCostCenterName: 'Karbantartás',
    percent: 29.99,
    capacity: 0,
    index: 2,
  },
];
