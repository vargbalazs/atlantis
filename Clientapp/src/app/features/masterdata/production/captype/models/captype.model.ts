import { Company } from '../../../general/company/models/company.model';
import { Plant } from '../../../general/plant/models/plant.model';

export class CapType {
  constructor(
    public id?: number,
    public capType?: string,
    public company?: Company,
    public companyId?: number,
    public plant?: Plant,
    public plantId?: number
  ) {}
}
