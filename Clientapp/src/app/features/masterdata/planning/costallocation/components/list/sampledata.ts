import { CostAllocation } from '../../models/costallocation.model';

export const costAllocations: CostAllocation[] = [
  {
    id: 1,
    level: 1,
    name: 'Épület',
    allocCostCenterId: 1,
    allocCostCenter: {
      id: 1,
      code: '1H3300',
      name: 'Szerelde',
      year: 2021,
      yearDate: new Date(2021, 0, 1),
    },
    costAccountId: 1,
    costAccount: {
      id: 1,
      accountNumber: '60040000',
      name: 'Indirekt anyagköltség',
    },
    year: 2021,
    yearDate: new Date(2021, 0, 1),
    allocCapacity: false,
    capacityUnit: '',
    totalCapacity: 0,
    companyId: 1,
    company: {
      id: 1,
      name: 'company 1 long name',
    },
    plantId: 1,
    plant: {
      id: 1,
      code: '1H0',
    },
  },
  {
    id: 2,
    level: 2,
    name: 'Áram',
    allocCostCenterId: 2,
    allocCostCenter: {
      id: 2,
      code: '1H2200',
      name: 'Fröccsöntő',
      year: 2021,
      yearDate: new Date(2021, 0, 1),
    },
    costAccountId: 2,
    costAccount: {
      id: 2,
      accountNumber: '62010000',
      name: 'Alapbér',
    },
    year: 2021,
    yearDate: new Date(2021, 0, 1),
    allocCapacity: true,
    capacityUnit: 'm',
    totalCapacity: 1000,
    companyId: 1,
    company: {
      id: 1,
      name: 'company 1 long name',
    },
    plantId: 1,
    plant: {
      id: 1,
      code: '1H0',
    },
  },
];
