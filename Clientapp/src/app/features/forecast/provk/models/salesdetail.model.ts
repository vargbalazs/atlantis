import { CapGroup } from 'src/app/features/masterdata/production/capgroup/models/capgroup.model';
import { SalesProduct } from 'src/app/features/masterdata/production/salesproduct/models/salesproduct.model';

export class SalesDetail {
  constructor(
    public id?: number,
    public provkId?: number,
    public year?: number,
    public month?: number,
    public version?: number,
    public capGroupId?: number,
    public value?: number,
    public capGroup?: CapGroup,
    public salesProductId?: number,
    public salesProduct?: SalesProduct
  ) {}
}
