import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { CostResp } from 'src/app/features/masterdata/planning/costresp/models/costresp.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { CostRespService } from '../../services/costresp.service';

@Component({
  selector: 'general-costresp',
  templateUrl: './list-costresp.component.html',
  styleUrls: ['../../../../../../styles/routed-component.css'],
})
export class CostRespComponent extends Crud<CostResp> implements OnInit {
  constructor(
    msgDialogService: MsgDialogService,
    notificationService: NotificationService,
    private costrespService: CostRespService,
    loaderService: LoaderService,
    translateService: TranslateService
  ) {
    super(
      msgDialogService,
      notificationService,
      costrespService,
      loaderService,
      translateService
    );
  }

  ngOnInit() {
    this.gridData = { data: [], total: 0 };
    this.costrespService.getCostResps().subscribe((costresps) => {
      this.gridData = { data: costresps, total: costresps.length };
    });
  }
}
