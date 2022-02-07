import { Company } from '../../company/models/company.model';
import { Plant } from '../../plant/models/plant.model';

export class PlantArea {
  constructor(
    public id?: number,
    public code?: string,
    public name?: string,
    public plantId?: number,
    public plant?: Plant,
    public company?: Company
  ) {}
}
