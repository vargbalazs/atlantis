import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { IRepository } from 'src/app/shared/interfaces/repository.interface';
import { CostPlanningItem } from 'src/app/features/planning/costplanning/models/costplanningitem.model';
import { HcPlanningItem } from 'src/app/features/planning/hcplanning/models/hcplanningitem.model';

@Injectable()
export class TaskService implements IRepository<Task> {
  constructor(private http: HttpClient) {}

  add(task: Task) {
    return this.http.post<number>('/api/planning/task', task);
  }

  update(task: Task) {
    return this.http.patch<number>('/api/planning/task', task);
  }

  delete(id: number) {
    return this.http.delete<number>(`/api/planning/task/${id}`);
  }

  done(id: number) {
    return this.http.patch<number>('/api/planning/task/done', id);
  }

  initTaskForm(
    planningItem: CostPlanningItem | HcPlanningItem,
    task: Task,
    isNew: boolean
  ): Task {
    if (isNew) {
      task.planningItemId = planningItem.id;
      task.taskType = 0;
      task.taskStatus = 0;
    }
    return task;
  }
}
