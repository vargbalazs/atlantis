import { TaskType } from 'src/app/shared/enums/tasktype.enum';

export interface TaskInterface {
  taskName?: string;
  taskType?: TaskType;
  plantLocation?: string;
  plantCode?: string;
  costCenter?: string;
  hovered?: boolean;
  costCenterId?: number;
  costAccTypeId?: number;
}
