import { Company } from 'src/app/features/masterdata/general/company/models/company.model';
import { Plant } from 'src/app/features/masterdata/general/plant/models/plant.model';

export class ProvkVersion {
  constructor(
    public id?: number,
    public provkId?: number,
    public year?: number,
    public month?: number,
    public version?: number,
    public ba?: number,
    public hovered?: boolean,
    public companyId?: number,
    public plantId?: number,
    public company?: Company,
    public plant?: Plant
  ) {}
}
