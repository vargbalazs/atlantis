import { Company } from 'src/app/features/masterdata/general/company/models/company.model';
import { Plant } from 'src/app/features/masterdata/general/plant/models/plant.model';
import { CostAccountingType } from 'src/app/features/masterdata/planning/costacctype/models/costacctype.model';
import { CapGroup } from 'src/app/features/masterdata/production/capgroup/models/capgroup.model';

export class CapPlanningItem {
  constructor(
    public id?: number,
    public companyId?: number,
    public company?: Company,
    public costAccTypeId?: number,
    public costAccType?: CostAccountingType,
    public year?: number,
    public plantId?: number,
    public plant?: Plant,
    public capGroupId?: number,
    public capGroup?: CapGroup,
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
