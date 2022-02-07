import { Job } from '../../models/job.model';

export const jobs: Job[] = [
  {
    id: 1,
    name: 'Gépbeállító',
    depId: 1,
    department: {
      id: 1,
      name: 'Lakkozó',
    },
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
    name: 'Szerszámcserélő',
    depId: 2,
    department: {
      id: 2,
      name: 'Fröccsöntő',
    },
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
    name: 'Operátor',
    depId: 3,
    department: {
      id: 3,
      name: 'Szerelde',
    },
    plant: {
      id: 2,
      code: '1U0',
    },
    company: {
      id: 1,
      name: 'company 1 long name',
    },
  },
  {
    id: 4,
    name: 'Operátor',
    depId: 3,
    department: {
      id: 3,
      name: 'Szerelde',
    },
    plant: {
      id: 1,
      code: '1H0',
    },
    company: {
      id: 1,
      name: 'company 1 long name',
    },
  },
];
