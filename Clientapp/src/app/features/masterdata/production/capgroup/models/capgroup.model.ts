import { Company } from '../../../general/company/models/company.model';
import { Plant } from '../../../general/plant/models/plant.model';
import { CapType } from '../../captype/models/captype.model';
import { CapUnit } from '../../capunit/models/capunit.model';

export class CapGroup {
  constructor(
    public id?: number,
    public capGroup?: string,
    public capType?: CapType,
    public capTypeId?: number,
    public capName?: string,
    public capUnit?: CapUnit,
    public capUnitId?: number,
    public company?: Company,
    public companyId?: number,
    public plant?: Plant,
    public plantId?: number,
    public unit?: string,
    public invNr?: string,
    public capYear?: number,
    public capYearDate?: Date,
    public normalCap?: number,
    public fixRate?: number
  ) {}
}
