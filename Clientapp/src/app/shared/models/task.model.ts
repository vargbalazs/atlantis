import { TaskStatus } from '../enums/taskstatus.enum';
import { TaskType } from '../enums/taskType.enum';

export class Task {
  constructor(
    public id?: number, // will be not used
    public planningItemId?: number,
    public taskName?: string,
    public taskType?: TaskType,
    public taskStatus?: TaskStatus
  ) {}
}
