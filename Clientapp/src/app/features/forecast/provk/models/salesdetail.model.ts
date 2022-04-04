export class SalesDetail {
  constructor(
    public id?: number,
    public provkId?: number,
    public year?: number,
    public month?: number,
    public version?: number,
    public capGroupId?: number,
    public capGroup?: string,
    public capName?: string,
    public value?: number,
    public salesProductId?: number,
    public name?: string,
    public unit?: string
  ) {}
}
