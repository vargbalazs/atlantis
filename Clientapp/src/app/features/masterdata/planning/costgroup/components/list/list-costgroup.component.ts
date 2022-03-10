import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { CostGroup } from 'src/app/features/masterdata/planning/costgroup/models/costgroup.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { CostGroupService } from '../../services/costgroup.service';
import { costGroups } from './sampledata';

@Component({
  selector: 'general-costgroup',
  templateUrl: './list-costgroup.component.html',
  styleUrls: ['../../../../../../styles/routed-component.css'],
})
export class CostGroupComponent extends Crud<CostGroup> implements OnInit {
  constructor(
    msgDialogService: MsgDialogService,
    notificationService: NotificationService,
    costgroupService: CostGroupService,
    loaderService: LoaderService
  ) {
    super(
      msgDialogService,
      notificationService,
      costgroupService,
      loaderService
    );
  }

  ngOnInit() {
    this.gridData = { data: costGroups, total: costGroups.length };
  }
}
