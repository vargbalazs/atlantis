export class CostAssign {
  constructor(
    public id?: number,
    public hcPlanningItemId?: number,
    public costAccountId?: number,
    public costAccountName?: string,
    public amount?: number,
    public index?: number
  ) {}
}
