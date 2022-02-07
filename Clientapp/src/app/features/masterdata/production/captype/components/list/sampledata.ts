import { CapType } from '../../models/captype.model';

export const capTypes: CapType[] = [
  {
    id: 1,
    capType: 'Fröccsöntő',
    companyId: 1,
    company: {
      id: 1,
      name: 'company 1 long name',
      shortName: 'company 1',
    },
    plantId: 1,
    plant: {
      id: 1,
      code: '1H0',
    },
  },
  {
    id: 2,
    capType: 'Lakkozó',
    companyId: 1,
    company: {
      id: 1,
      name: 'company 1 long name',
      shortName: 'company 1',
    },
    plantId: 1,
    plant: {
      id: 1,
      code: '1H0',
    },
  },
  {
    id: 3,
    capType: 'Szerelde',
    companyId: 1,
    company: {
      id: 1,
      name: 'company 1 long name',
      shortName: 'company 1',
    },
    plantId: 1,
    plant: {
      id: 1,
      code: '1H0',
    },
  },
];
