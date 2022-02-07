import { CostGroup } from '../../models/costgroup.model';

export const costGroups: CostGroup[] = [
  {
    id: 1,
    name: 'Gyári bevétel',
    rowIndex: 1,
    companyId: 1,
    company: {
      id: 1,
      name: 'commpany 1 long name',
      shortName: 'company 1',
    },
  },
  {
    id: 2,
    name: 'Anyagköltség',
    rowIndex: 2,
    companyId: 1,
    company: {
      id: 1,
      name: 'commpany 1 long name',
      shortName: 'company 1',
    },
  },
  {
    id: 3,
    name: 'Operátori bérköltség',
    rowIndex: 3,
    usedForPersPlanning: true,
    directWagesCost: true,
    companyId: 1,
    company: {
      id: 1,
      name: 'commpany 1 long name',
      shortName: 'company 1',
    },
  },
  {
    id: 4,
    name: 'Indirekt bérköltség',
    rowIndex: 4,
    usedForPersPlanning: true,
    directWagesCost: false,
    companyId: 1,
    company: {
      id: 1,
      name: 'commpany 1 long name',
      shortName: 'company 1',
    },
  },
];
