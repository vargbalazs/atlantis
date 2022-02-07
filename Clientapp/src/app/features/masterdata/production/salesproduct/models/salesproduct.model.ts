import { Company } from '../../../general/company/models/company.model';
import { Plant } from '../../../general/plant/models/plant.model';
import { CapGroup } from '../../capgroup/models/capgroup.model';
import { CapUnit } from '../../capunit/models/capunit.model';

export class SalesProduct {
  constructor(
    public id?: number,
    public name?: string,
    public capGroup?: CapGroup,
    public capGroupId?: number,
    public unit?: CapUnit,
    public unitId?: number,
    public company?: Company,
    public companyId?: number,
    public plant?: Plant,
    public plantId?: number,
    public year?: number,
    public yearDate?: Date
  ) {}
}
