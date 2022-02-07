import { CostCenter } from '../../models/costcenter.model';

export const costcenters: CostCenter[] = [
  {
    id: 1,
    code: '1H3300',
    name: 'Szerelde',
    year: 2021,
    yearDate: new Date(2021, 0, 1),
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
    plantAreaId: 1,
    plantArea: {
      id: 1,
      code: '1H2',
      name: 'Auto',
    },
  },
  {
    id: 2,
    code: '1H2200',
    name: 'Fröccsöntő',
    year: 2021,
    yearDate: new Date(2021, 0, 1),
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
    plantAreaId: 1,
    plantArea: {
      id: 1,
      code: '1H2',
      name: 'Auto',
    },
  },
  {
    id: 3,
    code: '1H2200',
    name: 'Fröccsöntő',
    year: 2022,
    yearDate: new Date(2022, 0, 1),
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
    plantAreaId: 1,
    plantArea: {
      id: 1,
      code: '1H2',
      name: 'Auto',
    },
  },
  {
    id: 4,
    code: '1H2930',
    name: 'Szerszámraktár',
    year: 2021,
    yearDate: new Date(2021, 0, 1),
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
    plantAreaId: 1,
    plantArea: {
      id: 1,
      code: '1H2',
      name: 'Auto',
    },
  },
  {
    id: 5,
    code: '1H5000',
    name: 'Karbantartás',
    year: 2021,
    yearDate: new Date(2021, 0, 1),
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
    plantAreaId: 1,
    plantArea: {
      id: 1,
      code: '1H2',
      name: 'Auto',
    },
  },
];
