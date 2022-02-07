import { Company } from '../../company/models/company.model';
import { Department } from '../../department/models/department.model';
import { Plant } from '../../plant/models/plant.model';

export class Job {
  constructor(
    public id?: number,
    public name?: string,
    public descr?: string,
    public depId?: number,
    public department?: Department,
    public plant?: Plant,
    public company?: Company
  ) {}
}
