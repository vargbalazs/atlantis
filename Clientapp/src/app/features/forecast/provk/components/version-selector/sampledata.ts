import { ProvkVersion } from '../../models/provkversion.model';

export const provkVersions: ProvkVersion[] = [
  {
    id: 1,
    provkId: 1,
    year: 2021,
    month: 1,
    version: 1,
    ba: -150825,
    companyId: 1,
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
    provkId: 1,
    year: 2021,
    month: 1,
    version: 2,
    ba: -200825,
    companyId: 1,
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
    provkId: 1,
    year: 2021,
    month: 1,
    version: 3,
    ba: 100603,
    companyId: 1,
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
];
