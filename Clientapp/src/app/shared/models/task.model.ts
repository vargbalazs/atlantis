export class Task {
  constructor(
    public id?: number, // will be not used
    public planningItemId?: number,
    public taskName?: string,
    public taskType?: number, // 0 - cost planning, 1 - hc planning
    public taskStatus?: number // 0 - open, 1 - closed
  ) {}
}
