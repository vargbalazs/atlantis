import { CostResp } from '../../models/costresp.model';

export const costresps: CostResp[] = [
  {
    id: 1,
    name: 'Jóska',
    email: 'abc@de.com',
    langId: 1,
    lang: {
      id: 1,
      isoCode: 'HU',
      name: 'magyar',
    },
    costCenterId: 1,
    costCenter: {
      id: 1,
      code: '1H3300',
      name: 'Szerelde',
      year: 2021,
      yearDate: new Date(2021, 0, 1),
      companyId: 1,
      plantId: 1,
      plantAreaId: 1,
    },
    depId: 1,
    department: {
      id: 1,
      name: 'Lakkozó',
      plantId: 1,
    },
    jobId: 1,
    job: {
      id: 1,
      name: 'Gépbeállító',
      depId: 1,
    },
    company: {
      id: 1,
      name: 'company 1 long name',
    },
    plant: {
      id: 1,
      code: '1H0',
    },
  },
];
