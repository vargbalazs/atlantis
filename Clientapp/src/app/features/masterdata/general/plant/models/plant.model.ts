import { Company } from '../../company/models/company.model';

export class Plant {
  constructor(
    public id?: number,
    public code?: string,
    public location?: string,
    public companyId?: number,
    public company?: Company
  ) {}
}
