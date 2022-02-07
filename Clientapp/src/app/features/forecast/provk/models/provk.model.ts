import { Company } from 'src/app/features/masterdata/general/company/models/company.model';
import { Plant } from 'src/app/features/masterdata/general/plant/models/plant.model';

export class Provk {
  constructor(
    public id?: number,
    public companyId?: number,
    public company?: Company,
    public plantId?: number,
    public plant?: Plant,
    public year?: number,
    public month?: number,
    public versions?: number,
    public hovered?: boolean,
    public period?: Date
  ) {}
}
