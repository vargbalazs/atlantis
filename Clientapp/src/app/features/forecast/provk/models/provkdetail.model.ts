export class ProvkDetail {
  constructor(
    public id?: number,
    public provkId?: number,
    public year?: number,
    public month?: number,
    public version?: number,
    public capGroupId?: number,
    public value?: number,
    public capGroup?: string,
    public capName?: string,
    public fixRate?: number,
    public invNr?: string,
    public normalCap?: number,
    public unit?: string,
    public capTypeId?: number,
    public ba?: number
  ) {}
}
