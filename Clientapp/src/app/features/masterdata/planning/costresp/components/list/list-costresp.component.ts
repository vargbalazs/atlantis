import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { CostResp } from 'src/app/features/masterdata/planning/costresp/models/costresp.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { CostRespService } from '../../services/costresp.service';
import { costresps } from './sampledata';

@Component({
  selector: 'general-costresp',
  templateUrl: './list-costresp.component.html',
  styleUrls: ['../../../../../../styles/routed-component.css'],
})
export class CostRespComponent extends Crud<CostResp> implements OnInit {
  constructor(
    msgDialogService: MsgDialogService,
    notificationService: NotificationService,
    costrespService: CostRespService,
    loaderService: LoaderService
  ) {
    super(
      msgDialogService,
      notificationService,
      costrespService,
      loaderService
    );
  }

  ngOnInit() {
    this.gridData = { data: costresps, total: costresps.length };
  }
}
