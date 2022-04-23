import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';
import { CostPlanningItem } from 'src/app/features/planning/costplanning/models/costplanningitem.model';
import { HcPlanningItem } from 'src/app/features/planning/hcplanning/models/hcplanningitem.model';
import { environment } from 'src/environments/environment';
import { TaskType } from '../enums/tasktype.enum';
import { TaskStatus } from '../enums/taskstatus.enum';

@Injectable()
export class TaskService implements IRepository<Task> {
  constructor(private http: HttpClient) {}

  update(task: Task) {
    return this.http.patch<number>(
      `${environment.apiUrl}/api/planning/task`,
      task
    );
  }

  initTaskForm(
    planningItem: CostPlanningItem | HcPlanningItem,
    task: Task,
    isNew: boolean,
    taskType: TaskType
  ): Task {
    task.planningItemId = planningItem.id;
    task.taskType = taskType;
    if (isNew) task.taskStatus = TaskStatus.OPEN;
    return task;
  }
}
