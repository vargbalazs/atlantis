import { CostAccount } from 'src/app/features/masterdata/planning/costaccount/models/costaccount.model';
import { CostCenter } from 'src/app/features/masterdata/planning/costcenter/models/costcenter.model';
import { CostGroup } from 'src/app/features/masterdata/planning/costgroup/models/costgroup.model';
import { ActVsBudget } from 'src/app/shared/models/actvsbudget.model';

export class CostCenterView extends ActVsBudget {
  constructor(
    public costCenter?: CostCenter,
    public costGroup?: CostGroup,
    public costAccount?: CostAccount
  ) {
    super();
  }
}
