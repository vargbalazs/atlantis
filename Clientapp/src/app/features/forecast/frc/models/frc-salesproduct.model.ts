import { SalesProduct } from 'src/app/features/masterdata/production/salesproduct/models/salesproduct.model';

export class FrcSalesProduct {
  constructor(
    public id?: number,
    public frcId?: number,
    public salesProductId?: number,
    public salesProduct?: SalesProduct,
    public capGroup?: string,
    public capType?: string,
    public capName?: string,
    public unit?: string,
    public p1?: number,
    public p2?: number,
    public p3?: number,
    public p4?: number,
    public p5?: number,
    public p6?: number,
    public p7?: number,
    public p8?: number,
    public p9?: number,
    public p10?: number,
    public p11?: number,
    public p12?: number,
    public total?: number
  ) {}
}
