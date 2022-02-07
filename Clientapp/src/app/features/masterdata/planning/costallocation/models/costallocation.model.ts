import { Company } from 'src/app/features/masterdata/general/company/models/company.model';
import { Plant } from 'src/app/features/masterdata/general/plant/models/plant.model';
import { CostAccount } from '../../costaccount/models/costaccount.model';
import { CostCenter } from '../../costcenter/models/costcenter.model';

export class CostAllocation {
  constructor(
    public id?: number,
    public name?: string,
    public level?: number,
    public allocCostCenterId?: number,
    public costAccountId?: number,
    public year?: number,
    public yearDate?: Date,
    public allocCapacity?: boolean,
    public capacityUnit?: string,
    public totalCapacity?: number,
    public companyId?: number,
    public plantId?: number,
    public company?: Company,
    public plant?: Plant,
    public allocCostCenter?: CostCenter,
    public costAccount?: CostAccount
  ) {}
}
