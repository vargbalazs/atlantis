import { CapGroup } from 'src/app/features/masterdata/production/capgroup/models/capgroup.model';

export class ProvkDetail {
  constructor(
    public id?: number,
    public provkId?: number,
    public year?: number,
    public month?: number,
    public version?: number,
    public capGroupId?: number,
    public value?: number,
    public capGroup?: CapGroup,
    public ba?: number
  ) {}
}
