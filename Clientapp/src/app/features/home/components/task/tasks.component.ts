import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskType } from 'src/app/shared/enums/tasktype.enum';
import { TaskInterface } from '../../interfaces/task.interface';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: TaskInterface[] = [];
  constructor(private homeService: HomeService, private router: Router) {}

  ngOnInit() {
    this.homeService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  cardOverOut(task: TaskInterface) {
    task.hovered = !task.hovered;
  }

  cardClick(task: TaskInterface) {
    switch (task.taskType) {
      case TaskType.COSTPLANNING:
        this.router.navigate(['planning/costplanning'], {
          skipLocationChange: true,
        });
        break;
      case TaskType.HCPLANNING:
        this.router.navigate(['planning/hcplanning'], {
          skipLocationChange: true,
        });
        break;
    }
  }
}
