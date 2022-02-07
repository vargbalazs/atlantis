import { PlanningVersion } from '../../models/version.model';

export const versions: PlanningVersion[] = [
  {
    id: 1,
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
    year: 2021,
    yearDate: new Date(2021, 0, 1),
    descr: 'budget 2021 v1',
    status: 0,
    costAccTypeId: 2,
    costAccType: {
      id: 2,
      name: 'Budget',
      descr: 'Budget tervezés',
    },
  },
  {
    id: 2,
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
    year: 2021,
    yearDate: new Date(2021, 0, 1),
    descr: 'budget 2021 v2',
    status: 1,
    costAccTypeId: 2,
    costAccType: {
      id: 2,
      name: 'Budget',
      descr: 'Budget tervezés',
    },
  },
];
