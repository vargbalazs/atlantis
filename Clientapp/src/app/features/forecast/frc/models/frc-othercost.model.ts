import { CostAccount } from 'src/app/features/masterdata/planning/costaccount/models/costaccount.model';
import { CostCenter } from 'src/app/features/masterdata/planning/costcenter/models/costcenter.model';

export class FrcOtherCost {
  constructor(
    public id?: number,
    public frcId?: number,
    public costAccId?: number,
    public costAcc?: CostAccount,
    public costAccName?: string,
    public costCenterId?: number,
    public costCenter?: CostCenter,
    public costEffect?: string,
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
