import { Plant } from 'src/app/features/masterdata/general/plant/models/plant.model';
import { CostAccount } from 'src/app/features/masterdata/planning/costaccount/models/costaccount.model';
import { CostAccountingType } from 'src/app/features/masterdata/planning/costacctype/models/costacctype.model';
import { CostGroup } from 'src/app/features/masterdata/planning/costgroup/models/costgroup.model';
import { ActVsBudget } from 'src/app/shared/models/actvsbudget.model';

export class PlantPlOverview extends ActVsBudget {
  constructor(
    public plant?: Plant,
    public costGroup?: CostGroup,
    public costAccount?: CostAccount,
    public costAccType?: CostAccountingType,
    public year?: number,
    public month?: number
  ) {
    super();
  }
}
