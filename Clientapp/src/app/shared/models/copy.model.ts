import { Company } from '../../features/masterdata/general/company/models/company.model';
import { Plant } from '../../features/masterdata/general/plant/models/plant.model';

export class CopyEntity {
  constructor(
    public id?: number,
    public sourceYear?: Date,
    public targetYear?: Date,
    public companyId?: number,
    public plantId?: number,
    public company?: Company,
    public plant?: Plant
  ) {}
}
