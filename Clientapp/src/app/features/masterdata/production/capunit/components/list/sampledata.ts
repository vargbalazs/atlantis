import { CapUnit } from '../../models/capunit.model';

export const capUnits: CapUnit[] = [
  {
    id: 1,
    unit: 'h',
    name: 'óra',
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
    unit: 'db',
    name: 'darab',
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
