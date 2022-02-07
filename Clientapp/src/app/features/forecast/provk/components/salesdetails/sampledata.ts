import { SalesDetail } from '../../models/salesdetail.model';

export const salesDetails: SalesDetail[] = [
  {
    id: 1,
    provkId: 1,
    year: 2021,
    month: 1,
    version: 1,
    capGroupId: undefined,
    capGroup: {},
    value: 100,
    salesProductId: 1,
    salesProduct: {
      id: 1,
      name: 'AU536PA BMP',
      unitId: 2,
      unit: {
        id: 2,
        unit: 'db',
        name: 'darab',
      },
    },
  },
  {
    id: 2,
    provkId: 1,
    year: 2021,
    month: 1,
    version: 1,
    capGroupId: 2,
    value: 200,
    capGroup: {
      id: 2,
      capGroup: '1H2K10',
      capTypeId: 3,
      capName: 'AU326 LDM',
      capUnitId: 2,
    },
    salesProductId: 2,
    salesProduct: {
      id: 2,
      name: 'AU326 LDM',
      unitId: 2,
      unit: {
        id: 2,
        unit: 'db',
        name: 'darab',
      },
    },
  },
];
