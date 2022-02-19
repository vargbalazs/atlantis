export class ActVsBudget {
  constructor(
    public budget?: number,
    public actual?: number,
    public monthDiff?: number,
    public cumBudget?: number,
    public cumActual?: number,
    public cumDiff?: number,
    public frc?: number,
    public cumFrc?: number,
    public monthFrcDiff?: number,
    public cumFrcDiff?: number
  ) {}
}
