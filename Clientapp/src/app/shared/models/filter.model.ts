import { CostAccountingType } from 'src/app/features/masterdata/planning/costacctype/models/costacctype.model';
import { CostCenter } from 'src/app/features/masterdata/planning/costcenter/models/costcenter.model';
import { Company } from '../../features/masterdata/general/company/models/company.model';
import { Plant } from '../../features/masterdata/general/plant/models/plant.model';

export class FilterEntity {
  constructor(
    public id?: number,
    public year?: Date,
    public companyId?: number,
    public plantId?: number,
    public company?: Company,
    public plant?: Plant,
    public costAccTypeId?: number,
    public costAccType?: CostAccountingType,
    public costCenterId?: number,
    public costCenter?: CostCenter
  ) {}
}
