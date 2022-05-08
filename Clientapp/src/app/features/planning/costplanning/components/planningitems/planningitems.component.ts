import {
  Component,
  DoCheck,
  IterableDiffers,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { CostPlanningItem } from '../../models/costplanningitem.model';
import { FilterEntity } from 'src/app/shared/models/filter.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { NotificationService } from '@progress/kendo-angular-notification';
import { CostPlanningService } from '../../services/costplanning.service';
import { CostAccount } from 'src/app/features/masterdata/planning/costaccount/models/costaccount.model';
import { forkJoin, Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { GroupDescriptor } from '@progress/kendo-data-query';
import { ContextMenuComponent } from '@progress/kendo-angular-menu';
import { Task } from '../../../../../shared/models/task.model';
import { TaskService } from '../../../../../shared/services/task.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { CostAccountService } from 'src/app/features/masterdata/planning/costaccount/services/costaccount.service';
import { TaskType } from 'src/app/shared/enums/tasktype.enum';
import { TaskStatus } from 'src/app/shared/enums/taskstatus.enum';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'cost-planningitems',
  templateUrl: './planningitems.component.html',
  styleUrls: [
    '../../../../../styles/routed-component.css',
    './planningitems.component.css',
  ],
})
export class CostPlanningItemsComponent
  extends Crud<CostPlanningItem>
  implements OnInit, DoCheck
{
  filterEntity!: FilterEntity;
  filterEntityInput!: FilterEntity;
  task!: Task;
  gridData!: GridDataResult;
  periods: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  filtered = false;
  filterFirst = false;
  costAccounts!: CostAccount[];
  aggregates: any[] = [{ field: 'amount', aggregate: 'sum' }];
  groups: GroupDescriptor[] = [
    { field: 'costGroup.name', aggregates: this.aggregates },
  ];
  contextMenuItems: any[] = [
    {
      text: this.translateService.instant('contextMenu.addTask'),
      icon: 'file',
      tag: 'newTask',
      disabled: false,
    },
    {
      text: this.translateService.instant('contextMenu.editTask'),
      icon: 'edit',
      tag: 'editTask',
      disabled: false,
    },
  ];
  contextItem!: CostPlanningItem;
  differ: any;

  @ViewChild('grid') grid!: GridComponent;
  @ViewChild('gridmenu') gridContextMenu!: ContextMenuComponent;

  constructor(
    msgDialogService: MsgDialogService,
    notificationService: NotificationService,
    private costPlanningService: CostPlanningService,
    loaderService: LoaderService,
    private taskService: TaskService,
    private costAccountService: CostAccountService,
    private differs: IterableDiffers,
    protected translateService: TranslateService
  ) {
    super(
      msgDialogService,
      notificationService,
      costPlanningService,
      loaderService,
      translateService
    );
    this.differ = differs.find([]).create(null!);
  }

  ngOnInit() {
    this.gridData = { data: [], total: 0 };
    this.checkFunctionsOnSave.push(this.checkSum);
  }

  ngDoCheck() {
    const change = this.differ.diff(this.gridData.data);
    if (change) {
      setTimeout(() => {
        this.grid.autoFitColumns();
      }, 0);
    }
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
      costPlanningItems: this.costPlanningService
        .getItems(filterEntity.costCenterId!, filterEntity.costAccTypeId!)
        .pipe(first()),
      costAccounts: this.costAccountService.getCostAccounts().pipe(first()),
    }).subscribe(({ costPlanningItems, costAccounts }) => {
      this.gridData = {
        data: costPlanningItems,
        total: costPlanningItems.length,
      };
      this.costAccounts = costAccounts.filter(
        (account) =>
          account.companyId === filterEntity.companyId &&
          account.year === filterEntity.year?.getFullYear()
      );
      setTimeout(() => {
        this.grid.autoFitColumns();
      }, 0);
      this.filtered = true;
    });
  }

  checkSum(costPlanningItem: CostPlanningItem): Observable<boolean> {
    let total = 0;
    for (const [key, value] of Object.entries(costPlanningItem)) {
      if (key.startsWith('p') && key.length <= 3) {
        total += Math.round(value);
      }
    }
    // if the backend is ready, then change this to the chekSum service call
    const checkResult = of(total === costPlanningItem.amount).pipe(
      map((result) => {
        switch (result) {
          case false:
            this.isMsgDialog = true;
            this.dialogType = 'danger';
            this.msgDialogService.showDialog(
              this.translateService.instant('sidebar.costPlanning'),
              this.translateService.instant('dialog.sumDoesntMatch'),
              [{ text: 'Ok', primary: true }]
            );
            return false;
          case true:
            return true;
          default:
            return false;
        }
      })
    );
    return checkResult;
  }

  onCellClick(e: any): void {
    if (e.type === 'contextmenu') {
      const originalEvent = e.originalEvent;
      originalEvent.preventDefault();
      const planningItem = <CostPlanningItem>e.dataItem;
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
    }
  }

  showTaskForm(planningItem: CostPlanningItem, task: Task) {
    this.task = this.taskService.initTaskForm(
      planningItem,
      task,
      this.isNew,
      TaskType.COSTPLANNING
    );
  }

  cancelTaskForm() {
    this.task = undefined!;
  }

  saveTaskForm(task: Task) {
    this.task = undefined!;
    this.taskService.update(task).subscribe(() => {
      this.gridData.data.forEach((item: CostPlanningItem) => {
        if (item.id === task.planningItemId) {
          item.task = task;
        }
      });
      setTimeout(() => {
        this.grid.autoFitColumns();
      }, 0);
      if (this.isNew) {
        this.showNotification(
          this.translateService.instant('notifications.taskAddedSuccess'),
          3000,
          'success'
        );
      } else {
        this.showNotification(
          this.translateService.instant('notifications.taskEditedSuccess'),
          3000,
          'success'
        );
      }
    });
  }

  taskDone(task: Task) {
    this.taskService.update(task).subscribe(() => {
      this.gridData.data.forEach((item: CostPlanningItem) => {
        if (item.id === task.planningItemId) {
          item.task!.taskStatus = TaskStatus.CLOSED;
          item.task!.taskName = '';
        }
      });
      this.showNotification(
        this.translateService.instant('notifications.taskEditedSuccess'),
        3000,
        'success'
      );
    });
  }
}
