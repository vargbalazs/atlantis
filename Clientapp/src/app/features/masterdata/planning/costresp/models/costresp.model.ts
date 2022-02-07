import { Company } from '../../../general/company/models/company.model';
import { Department } from '../../../general/department/models/department.model';
import { Job } from '../../../general/job/models/job.model';
import { Language } from '../../../general/language/models/language.model';
import { Plant } from '../../../general/plant/models/plant.model';
import { CostCenter } from '../../costcenter/models/costcenter.model';

export class CostResp {
  constructor(
    public id?: number,
    public name?: string,
    public email?: string,
    public langId?: number,
    public costCenterId?: number,
    public depId?: number,
    public jobId?: number,
    public company?: Company,
    public plant?: Plant,
    public costCenter?: CostCenter,
    public department?: Department,
    public job?: Job,
    public lang?: Language
  ) {}
}
