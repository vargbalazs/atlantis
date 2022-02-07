import { FrcHc } from '../../models/frc-hc.model';

export const frcHc: FrcHc[] = [
  {
    id: 1,
    frcId: 1,
    hcPlanningItemId: 1,
    hcPlanningItem: {
      id: 1,
      costCenter: { id: 1, code: '1H3300', name: 'Lakk' },
      costGroup: {
        id: 3,
        name: 'Operátori bérköltség',
        usedForPersPlanning: true,
      },
      jobId: 1,
      job: {
        id: 1,
        name: 'Gépbeállító',
        depId: 1,
        department: {
          id: 1,
          name: 'Lakkozó',
        },
      },
    },
    p1: 0,
    p2: 0,
    p3: 0,
    p4: 0,
    p5: 0,
    p6: 0,
    p7: 0,
    p8: 0,
    p9: 0,
    p10: 0,
    p11: 0,
    p12: 0,
  },
];
