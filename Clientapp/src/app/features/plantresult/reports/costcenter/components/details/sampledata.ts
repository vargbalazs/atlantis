import { CostCenterView } from '../../models/costcenterview.model';

export const costCenterView: CostCenterView[] = [
  {
    costCenter: { id: 1, code: '1H3300', name: 'Szerelde' },
    costGroup: { id: 2, name: 'Anyagköltség' },
    costAccount: {
      id: 1,
      accountNumber: '60040000',
      name: 'Indirekt anyagköltség',
    },
    budget: 6000,
    actual: 3000,
    monthDiff: 3000,
    cumBudget: 6000,
    cumActual: 3000,
    cumDiff: 3000,
  },
  {
    costCenter: { id: 1, code: '1H3300', name: 'Szerelde' },
    costGroup: { id: 4, name: 'Indirekt bérköltség' },
    costAccount: {
      id: 2,
      accountNumber: '62010000',
      name: 'Alapbér',
    },
    budget: 4000,
    actual: 5000,
    monthDiff: -1000,
    cumBudget: 4000,
    cumActual: 5000,
    cumDiff: -1000,
  },
];
