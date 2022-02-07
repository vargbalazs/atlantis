import { Company } from '../../../general/company/models/company.model';
import { CostGroup } from '../../costgroup/models/costgroup.model';

export class CostAccount {
  constructor(
    public id?: number,
    public accountNumber?: string,
    public name?: string,
    public fixRate?: number,
    public varRate?: number,
    public usedForPersPlanning?: boolean,
    public year?: number,
    public yearDate?: Date,
    public companyId?: number,
    public costGroupId?: number,
    public company?: Company,
    public costGroup?: CostGroup
  ) {}
}
