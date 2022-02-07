import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { HcPlanningItem } from '../../models/hcplanningitem.model';
import { FilterEntity } from 'src/app/shared/models/filter.model';
import { hcPlanningItems } from './sampledata';
import { Crud } from 'src/app/shared/classes/crud.class';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { NotificationService } from '@progress/kendo-angular-notification';
import { HcPlanningService } from '../../services/hcplanning.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GroupDescriptor } from '@progress/kendo-data-query';
import { ContextMenuComponent } from '@progress/kendo-angular-menu';
import { Task } from '../../../../../shared/models/task.model';
import { TaskService } from '../../../../../shared/services/task.service';
import { CostGroup } from 'src/app/features/masterdata/planning/costgroup/models/costgroup.model';
import { Job } from 'src/app/features/masterdata/general/job/models/job.model';
import { costGroups } from 'src/app/features/masterdata/planning/costgroup/components/list/sampledata';
import { jobs } from 'src/app/features/masterdata/general/job/components/list/sampledata';
import { CostAccount } from 'src/app/features/masterdata/planning/costaccount/models/costaccount.model';
import { costAccounts } from 'src/app/features/masterdata/planning/costaccount/components/list/sampledata';
import { CostAssign } from '../../models/costassign.model';
import { costAssigns } from './costassigns';

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
    hcPlanningService: HcPlanningService,
    private taskService: TaskService
  ) {
    super(msgDialogService, notificationService, hcPlanningService);
  }

  ngOnInit() {
    this.gridData = { data: [], total: 0 };
    this.aggregates = this.generateAggregatesArray();
    this.groups = [{ field: 'costGroup.name', aggregates: this.aggregates }];
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
      const filteredData = hcPlanningItems.filter(
        (item) =>
          item.companyId === filterEntity.companyId &&
          item.plantId === filterEntity.plantId &&
          item.year === filterEntity.year?.getFullYear() &&
          item.costAccTypeId === filterEntity.costAccTypeId &&
          item.costCenterId === filterEntity.costCenterId
      );
      this.gridData = { data: filteredData, total: filteredData.length };
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
    }, 1500);
    console.log('filtering...');
  }

  onCellClick(e: any): void {
    if (e.type === 'contextmenu') {
      const originalEvent = e.originalEvent;
      originalEvent.preventDefault();
      const planningItem = <HcPlanningItem>e.dataItem;
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
      case 'costAssign': {
        this.loadingOverlayVisible = true;
        // call the service, if the backend is ready
        setTimeout(() => {
          this.loadingOverlayVisible = false;
          this.costAssigns = costAssigns.filter(
            (costAssign) => costAssign.hcPlanningItemId === this.contextItem.id
          );
        }, 1500);
      }
    }
  }

  showTaskForm(planningItem: HcPlanningItem, task: Task) {
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
        this.gridData.data.forEach((item: HcPlanningItem) => {
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
        this.gridData.data.forEach((item: HcPlanningItem) => {
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
      this.gridData.data.forEach((item: HcPlanningItem) => {
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
