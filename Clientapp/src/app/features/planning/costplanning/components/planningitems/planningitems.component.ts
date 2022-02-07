import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { CostPlanningItem } from '../../models/costplanningitem.model';
import { FilterEntity } from 'src/app/shared/models/filter.model';
import { costPlanningItems } from './sampledata';
import { Crud } from 'src/app/shared/classes/crud.class';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { NotificationService } from '@progress/kendo-angular-notification';
import { CostPlanningService } from '../../services/costplanning.service';
import { CostAccount } from 'src/app/features/masterdata/planning/costaccount/models/costaccount.model';
import { costAccounts } from 'src/app/features/masterdata/planning/costaccount/components/list/sampledata';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GroupDescriptor } from '@progress/kendo-data-query';
import { ContextMenuComponent } from '@progress/kendo-angular-menu';
import { Task } from '../../../../../shared/models/task.model';
import { TaskService } from '../../../../../shared/services/task.service';

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
  implements OnInit
{
  filterEntity!: FilterEntity;
  filterEntityInput!: FilterEntity;
  task!: Task;
  gridData!: GridDataResult;
  periods: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  filtered = false;
  costAccounts!: CostAccount[];
  aggregates: any[] = [{ field: 'amount', aggregate: 'sum' }];
  groups: GroupDescriptor[] = [
    { field: 'costGroup.name', aggregates: this.aggregates },
  ];
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
  ];
  contextItem!: CostPlanningItem;

  @ViewChild('grid') grid!: GridComponent;
  @ViewChild('gridmenu') gridContextMenu!: ContextMenuComponent;

  constructor(
    msgDialogService: MsgDialogService,
    notificationService: NotificationService,
    costPlanningService: CostPlanningService,
    private taskService: TaskService
  ) {
    super(msgDialogService, notificationService, costPlanningService);
  }

  ngOnInit() {
    this.gridData = { data: [], total: 0 };
    this.checkFunctionsOnSave.push(this.checkSum);
  }

  showFilterForm() {
    this.filterEntity = new FilterEntity();
  }

  cancelFilterForm() {
    this.filterEntity = undefined!;
  }

  saveFilterForm(filterEntity: FilterEntity) {
    this.filterEntity = undefined!;
    this.filterEntityInput = filterEntity;
    this.loadingOverlayVisible = true;
    // this.actProdDataService
    //   .getActualData(
    //     filterEntity.companyId!,
    //     filterEntity.plantId!,
    //     filterEntity.year?.getFullYear()!
    //   )
    //   .subscribe((result) => {
    //     this.loadingOverlayVisible = false;
    //     this.gridData = { data: result, total: result.length };
    //     // filter the accounts
    //     setTimeout(() => {
    //       this.grid.autoFitColumns();
    //     }, 0);
    //     this.filtered = true;
    //   });

    setTimeout(() => {
      this.loadingOverlayVisible = false;
      const filteredData = costPlanningItems.filter(
        (item) =>
          item.companyId === filterEntity.companyId &&
          item.plantId === filterEntity.plantId &&
          item.year === filterEntity.year?.getFullYear() &&
          item.costAccTypeId === filterEntity.costAccTypeId &&
          item.costCenterId === filterEntity.costCenterId
      );
      this.gridData = { data: filteredData, total: filteredData.length };
      this.costAccounts = costAccounts.filter(
        (account) =>
          account.companyId === filterEntity.companyId &&
          account.year === filterEntity.year?.getFullYear()
      );
      setTimeout(() => {
        this.grid.autoFitColumns();
      }, 0);
      this.filtered = true;
      console.log('finished');
    }, 1500);
    console.log('filtering...');
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
              'Költségtervezés',
              'A havi összegek összesenje nem egyezik a megadott éves összeggel',
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
      this.contextMenuItems[0].disabled = this.contextItem.task;
      // editing an existing task
      this.contextMenuItems[1].disabled = !this.contextItem.task;
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
    this.task = this.taskService.initTaskForm(planningItem, task, this.isNew);
  }

  cancelTaskForm() {
    this.task = undefined!;
  }

  saveTaskForm(task: Task) {
    this.task = undefined!;
    this.loadingOverlayVisible = true;
    // if (this.isNew) {
    //   this.taskService.add(task).subscribe((result) => {
    //     this.loadingOverlayVisible = false;
    //     this.gridData.data.forEach((item: CostPlanningItem) => {
    //       if (item.id === task.itemId) {
    //         item.taskId = result;
    //         task.id = result;
    //         item.task = task;
    //       }
    //     });
    //     setTimeout(() => {
    //       this.grid.autoFitColumns();
    //     }, 0);
    //     this.showNotification(
    //       'Az új feladat sikeresen rögzítve lett',
    //       3000,
    //       'success'
    //     );
    //   });
    // } else {
    //   this.taskService.update(task).subscribe(() => {
    //     this.loadingOverlayVisible = false;
    //     this.gridData.data.forEach((item: CostPlanningItem) => {
    //       if (item.id === task.itemId) item.task = task;
    //     });
    //     setTimeout(() => {
    //       this.grid.autoFitColumns();
    //     }, 0);
    //     this.showNotification(
    //       'A feladat sikeresen módosítva lett',
    //       3000,
    //       'success'
    //     );
    //   });
    // }
    if (this.isNew) {
      setTimeout(() => {
        this.loadingOverlayVisible = false;
        this.gridData.data.forEach((item: CostPlanningItem) => {
          // in this sample case we assign the next id to the taskId manually
          if (item.id === task.itemId) {
            item.taskId = 2;
            task.id = 2;
            item.task = task;
          }
        });
        this.showNotification(
          'Az új feladat sikeresen rögzítve lett',
          3000,
          'success'
        );
        setTimeout(() => {
          this.grid.autoFitColumns();
        }, 0);
        console.log('task saved');
      }, 1500);
    } else {
      setTimeout(() => {
        this.loadingOverlayVisible = false;
        this.gridData.data.forEach((item: CostPlanningItem) => {
          if (item.id === task.itemId) item.task = task;
        });
        this.showNotification(
          'A feladat sikeresen módosítva lett',
          3000,
          'success'
        );
        setTimeout(() => {
          this.grid.autoFitColumns();
        }, 0);
        console.log('task saved');
      }, 1500);
    }
    console.log('task saving...');
  }

  taskDone(task: Task) {
    this.loadingOverlayVisible = true;
    // this.taskService.done(task.id!).subscribe(() => {
    //   this.loadingOverlayVisible = false;
    //   this.showNotification(
    //     'A feladat sikeresen módosítva lett',
    //     3000,
    //     'success'
    //   );
    // });
    setTimeout(() => {
      this.gridData.data.forEach((item: CostPlanningItem) => {
        if (item.taskId === task.id) {
          item.taskId = undefined;
          item.task = undefined;
        }
      });
      this.loadingOverlayVisible = false;
      this.showNotification(
        'A feladat sikeresen módosítva lett',
        3000,
        'success'
      );
    }, 1500);
  }
}
