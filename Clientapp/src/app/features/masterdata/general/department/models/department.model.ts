import { Company } from '../../company/models/company.model';
import { Plant } from '../../plant/models/plant.model';

export class Department {
  constructor(
    public id?: number,
    public name?: string,
    public plantId?: number,
    public company?: Company,
    public plant?: Plant
  ) {}
}
