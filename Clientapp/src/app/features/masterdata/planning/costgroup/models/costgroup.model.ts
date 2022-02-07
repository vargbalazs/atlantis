import { Company } from '../../../general/company/models/company.model';

export class CostGroup {
  constructor(
    public id?: number,
    public name?: string,
    public rowIndex?: number,
    public usedForPersPlanning?: boolean,
    public ohterPlantCost?: boolean,
    public directWagesCost?: boolean,
    public companyId?: number,
    public company?: Company
  ) {}
}
