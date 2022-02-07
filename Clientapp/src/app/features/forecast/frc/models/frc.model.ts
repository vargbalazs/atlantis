import { Company } from 'src/app/features/masterdata/general/company/models/company.model';
import { Plant } from 'src/app/features/masterdata/general/plant/models/plant.model';
import { CostAccountingType } from 'src/app/features/masterdata/planning/costacctype/models/costacctype.model';

export class Frc {
  constructor(
    public id?: number,
    public companyId?: number,
    public company?: Company,
    public plantId?: number,
    public plant?: Plant,
    public year?: number,
    public costAccTypeId?: number,
    public costAccType?: CostAccountingType,
    public version?: string,
    public comment?: string,
    public closed?: boolean,
    public hovered?: boolean,
    public va?: number,
    public ba?: number
  ) {}
}
