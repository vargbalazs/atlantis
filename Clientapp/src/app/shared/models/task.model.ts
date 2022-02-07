export class Task {
  constructor(
    public id?: number,
    public itemId?: number,
    public task?: string,
    public year?: number,
    public type?: number, // 0 - cost planning, 1 - hc planning
    public status?: number // 0 - open, 1 - closed
  ) {}
}
