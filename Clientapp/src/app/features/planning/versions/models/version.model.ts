import { Company } from 'src/app/features/masterdata/general/company/models/company.model';
import { Plant } from 'src/app/features/masterdata/general/plant/models/plant.model';
import { CostAccountingType } from 'src/app/features/masterdata/planning/costacctype/models/costacctype.model';

export class PlanningVersion {
  constructor(
    public id?: number,
    public companyId?: number,
    public company?: Company,
    public year?: number,
    public yearDate?: Date,
    public costAccTypeId?: number,
    public costAccType?: CostAccountingType,
    public plantId?: number,
    public plant?: Plant,
    public descr?: string,
    public status?: number
  ) {}
}
