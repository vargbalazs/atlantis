import { FileInfo } from '@progress/kendo-angular-upload';
import { Company } from 'src/app/features/masterdata/general/company/models/company.model';

export class uploadCost {
  constructor(
    public companyId?: number,
    public company?: Company,
    public plantId?: number,
    public plant?: number,
    public month?: Date,
    public files?: []
  ) {}
}
