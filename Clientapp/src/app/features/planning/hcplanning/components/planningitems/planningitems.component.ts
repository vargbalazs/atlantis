import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { HcPlanningItem } from '../../models/hcplanningitem.model';
import { FilterEntity } from 'src/app/shared/models/filter.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { NotificationService } from '@progress/kendo-angular-notification';
import { HcPlanningService } from '../../services/hcplanning.service';
import { forkJoin, Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { GroupDescriptor } from '@progress/kendo-data-query';
import { ContextMenuComponent } from '@progress/kendo-angular-menu';
import { Task } from '../../../../../shared/models/task.model';
import { TaskService } from '../../../../../shared/services/task.service';
import { CostGroup } from 'src/app/features/masterdata/planning/costgroup/models/costgroup.model';
import { Job } from 'src/app/features/masterdata/general/job/models/job.model';
import { CostAccount } from 'src/app/features/masterdata/planning/costaccount/models/costaccount.model';
import { CostAssign } from '../../models/costassign.model';
import { costAssigns } from './costassigns';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { TaskType } from 'src/app/shared/enums/tasktype.enum';
import { CostGroupService } from 'src/app/features/masterdata/planning/costgroup/services/costgroup.service';
import { JobService } from 'src/app/features/masterdata/general/job/services/job.service';
import { CostAccountService } from 'src/app/features/masterdata/planning/costaccount/services/costaccount.service';
import { TaskStatus } from 'src/app/shared/enums/taskstatus.enum';

@Component({
  selector: 'hc-planningitems',
  templateUrl: './planningitems.component.html',
  styleUrls: [
    '../../../../../styles/routed-component.css',
    './planningitems.component.css',
  ],
})
export class HcPlanningItemsComponent
  extends Crud<HcPlanningItem>
  implements OnInit
{
  filterEntity!: FilterEntity;
  filterEntityInput!: FilterEntity;
  task!: Task;
  gridData!: GridDataResult;
  periods: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  filtered = false;
  filterFirst = false;
  costGroups!: CostGroup[];
  jobs!: Job[];
  costAccTypeId!: number;
  //aggregates: any[] = [{ field: 'p1', aggregate: 'sum' }];
  aggregates!: any[];
  groups!: GroupDescriptor[];
  contextMenuItems: any[] = [
    {
      text: 'Feladat hozzáadása',
      icon: 'file',
      tag: 'newTask',
      disabled: false,
    },
    {
      text: 'Feladat szerkesztése',
      icon: 'edit',
      tag: 'editTask',
      disabled: false,
    },
    {
      text: 'Költségek hozzárendelése',
      icon: 'dollar',
      tag: 'costAssign',
      disabled: false,
    },
  ];
  contextItem!: HcPlanningItem;
  costAccounts!: CostAccount[];
  costAssigns!: CostAssign[];
  isMsgDialog = true;
  dialogType = 'danger';

  @ViewChild('grid') grid!: GridComponent;
  @ViewChild('gridmenu') gridContextMenu!: ContextMenuComponent;

  constructor(
    msgDialogService: MsgDialogService,
    notificationService: NotificationService,
    private hcPlanningService: HcPlanningService,
    loaderService: LoaderService,
    private taskService: TaskService,
    private costGroupService: CostGroupService,
    private jobService: JobService,
    private costAccountService: CostAccountService
  ) {
    super(
      msgDialogService,
      notificationService,
      hcPlanningService,
      loaderService
    );
  }

  ngOnInit() {
    this.gridData = { data: [], total: 0 };
    this.aggregates = this.generateAggregatesArray();
    this.groups = [{ field: 'costGroup.name', aggregates: this.aggregates }];
  }

  showFilterForm() {
    this.filterEntity = this.filterEntityInput
      ? this.filterEntityInput
      : new FilterEntity();
    this.filterFirst = !this.filterEntityInput;
  }

  cancelFilterForm() {
    this.filterEntity = undefined!;
    this.filterFirst = !this.filterEntityInput;
  }

  saveFilterForm(filterEntity: FilterEntity) {
    this.filterEntity = undefined!;
    this.filterEntityInput = filterEntity;
    forkJoin({
      hcPlanningItems: this.hcPlanningService
        .getItems(filterEntity.costCenterId!, filterEntity.costAccTypeId!)
        .pipe(first()),
      costGroups: this.costGroupService.getCostGroups().pipe(first()),
      jobs: this.jobService.getJobs().pipe(first()),
      costAccounts: this.costAccountService.getCostAccounts().pipe(first()),
    }).subscribe(({ hcPlanningItems, costGroups, jobs, costAccounts }) => {
      this.gridData = { data: hcPlanningItems, total: hcPlanningItems.length };
      this.costGroups = costGroups.filter(
        (costGroup) =>
          costGroup.companyId === filterEntity.companyId &&
          costGroup.usedForPersPlanning === true
      );
      this.jobs = jobs.filter(
        (job) =>
          job.company?.id === filterEntity.companyId &&
          job.plant?.id === filterEntity.plantId
      );
      this.costAccounts = costAccounts.filter(
        (costAccount) =>
          costAccount.companyId === filterEntity.companyId &&
          costAccount.year === filterEntity.year?.getFullYear() &&
          costAccount.usedForPersPlanning === true
      );
      setTimeout(() => {
        this.grid.autoFitColumns();
      }, 0);
      this.filtered = true;
      console.log('finished');
    });
    console.log('filtering...');
  }

  onCellClick(e: any): void {
    if (e.type === 'contextmenu') {
      const originalEvent = e.originalEvent;
      originalEvent.preventDefault();
      const planningItem = <HcPlanningItem>e.dataItem;
      this.contextItem = planningItem;
      // adding new task
      this.contextMenuItems[0].disabled = this.contextItem.task?.taskName;
      // editing an existing task
      this.contextMenuItems[1].disabled = !this.contextItem.task?.taskName;
      this.gridContextMenu.show({
        left: originalEvent.pageX,
        top: originalEvent.pageY,
      });
    }
  }

  onContextMenuItemSelect({ item }: { item: any }): void {
    //const index = this.gridData.data.indexOf(this.contextItem);
    switch (item.tag) {
      case 'newTask': {
        this.isNew = true;
        this.showTaskForm(this.contextItem, new Task());
        break;
      }
      case 'editTask': {
        this.isNew = false;
        this.showTaskForm(this.contextItem, this.contextItem.task!);
        break;
      }
      case 'costAssign': {
        this.hcPlanningService
          .getCostAssigns(this.contextItem.id!)
          .subscribe((costAssigns) => {
            this.costAssigns = costAssigns;
          });
      }
    }
  }

  showTaskForm(planningItem: HcPlanningItem, task: Task) {
    this.task = this.taskService.initTaskForm(
      planningItem,
      task,
      this.isNew,
      TaskType.HCPLANNING
    );
  }

  cancelTaskForm() {
    this.task = undefined!;
  }

  saveTaskForm(task: Task) {
    this.task = undefined!;
    this.taskService.update(task).subscribe(() => {
      this.gridData.data.forEach((item: HcPlanningItem) => {
        if (item.id === task.planningItemId) {
          item.task = task;
        }
      });
      setTimeout(() => {
        this.grid.autoFitColumns();
      }, 0);
      if (this.isNew) {
        this.showNotification(
          'Az új feladat sikeresen rögzítve lett',
          3000,
          'success'
        );
      } else {
        this.showNotification(
          'A feladat sikeresen módosítva lett',
          3000,
          'success'
        );
      }
    });
    console.log('task saving...');
  }

  taskDone(task: Task) {
    this.taskService.update(task).subscribe(() => {
      this.gridData.data.forEach((item: HcPlanningItem) => {
        if (item.id === task.planningItemId) {
          item.task!.taskStatus = TaskStatus.CLOSED;
          item.task!.taskName = '';
        }
      });
      this.showNotification(
        'A feladat sikeresen módosítva lett',
        3000,
        'success'
      );
    });
  }

  generateAggregatesArray(): {}[] {
    let sumFields = [];
    for (let i = 1; i <= 12; i++) {
      sumFields.push({ field: `p${i}`, aggregate: 'sum' });
    }
    return sumFields;
  }

  saveCostAssign({
    hcPlanningItemId,
    assigned,
  }: {
    hcPlanningItemId: number;
    assigned: boolean;
  }) {
    this.gridData.data.forEach((item: HcPlanningItem) => {
      if (item.id === hcPlanningItemId) item.costAssigned = assigned;
    });
  }

  cancelCostAssign() {
    this.costAssigns = undefined!;
  }
}
