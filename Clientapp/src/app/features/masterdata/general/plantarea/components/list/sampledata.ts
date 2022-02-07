import { PlantArea } from '../../models/plantarea.model';

export const plantareas: PlantArea[] = [
  {
    id: 1,
    code: '1H2',
    name: 'Auto',
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
    code: '1U1',
    name: 'Auto',
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
