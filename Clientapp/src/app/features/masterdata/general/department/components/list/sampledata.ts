import { Department } from '../../models/department.model';

export const departments: Department[] = [
  {
    id: 1,
    name: 'Lakkozó',
    plantId: 1,
    plant: {
      id: 1,
      code: '1H0',
    },
    company: {
      id: 1,
      name: 'company 1 long name',
    },
  },
  {
    id: 2,
    name: 'Fröccsöntő',
    plantId: 1,
    plant: {
      id: 1,
      code: '1H0',
    },
    company: {
      id: 1,
      name: 'company 1 long name',
    },
  },
  {
    id: 3,
    name: 'Szerelde',
    plantId: 2,
    plant: {
      id: 2,
      code: '1U0',
    },
    company: {
      id: 1,
      name: 'company 1 long name',
    },
  },
];
