import { Company } from 'src/app/features/masterdata/general/company/models/company.model';
import { Plant } from 'src/app/features/masterdata/general/plant/models/plant.model';
import { CostAccount } from 'src/app/features/masterdata/planning/costaccount/models/costaccount.model';
import { CostAccountingType } from 'src/app/features/masterdata/planning/costacctype/models/costacctype.model';
import { CostCenter } from 'src/app/features/masterdata/planning/costcenter/models/costcenter.model';
import { CostGroup } from 'src/app/features/masterdata/planning/costgroup/models/costgroup.model';
import { Task } from 'src/app/shared/models/task.model';
import { Currency } from './currency.model';

export class CostPlanningItem {
  constructor(
    public id?: number,
    public companyId?: number,
    public company?: Company,
    public costAccTypeId?: number,
    public costAccType?: CostAccountingType,
    public year?: number,
    public plantId?: number,
    public plant?: Plant,
    public costCenterId?: number,
    public costCenter?: CostCenter,
    public costGroupId?: number,
    public costGroup?: CostGroup,
    public itemName?: string,
    public amountInCurrency?: number,
    public currencyId?: number,
    public currency?: Currency,
    public amount?: number,
    public distribution?: number,
    public comment?: string,
    public costAccountId?: number,
    public costAccount?: CostAccount,
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
    public p12?: number,
    public task?: Task
  ) {}
}
