import { HcPlanningItem } from 'src/app/features/planning/hcplanning/models/hcplanningitem.model';

export class FrcHc {
  constructor(
    public id?: number,
    public frcId?: number,
    public hcPlanningItemId?: number,
    public hcPlanningItem?: HcPlanningItem,
    public department?: string,
    public costGroup?: string,
    public job?: string,
    public costCenter?: string,
    public p1?: number,
    public p2?: number,
    public p3?: number,
    public p4?: number,
    public p5?: number,
    public p6?: number,
    public p7?: number,
    public p8?: number,
    public p9?: number,
    public p10?: number,
    public p11?: number,
    public p12?: number
  ) {}
}
