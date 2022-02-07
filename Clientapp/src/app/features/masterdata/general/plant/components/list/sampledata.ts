import { Plant } from 'src/app/features/masterdata/general/plant/models/plant.model';

export const plants: Plant[] = [
  {
    id: 1,
    code: '1H0',
    location: 'Győr',
    companyId: 1,
    company: {
      id: 1,
      name: 'company 1 long name',
      shortName: 'company 1',
    },
  },
  {
    id: 2,
    code: '1U0',
    location: 'Újh',
    companyId: 1,
    company: {
      id: 1,
      name: 'company 1 long name',
      shortName: 'company 1',
    },
  },
];
