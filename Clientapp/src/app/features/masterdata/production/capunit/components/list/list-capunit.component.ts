import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { CapUnit } from 'src/app/features/masterdata/production/capunit/models/capunit.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { CapUnitService } from '../../services/capunit.service';

@Component({
  selector: 'production-capunit',
  templateUrl: './list-capunit.component.html',
  styleUrls: ['../../../../../../styles/routed-component.css'],
})
export class CapUnitComponent extends Crud<CapUnit> implements OnInit {
  constructor(
    msgDialogService: MsgDialogService,
    notificationService: NotificationService,
    private capGroupService: CapUnitService,
    loaderService: LoaderService,
    translateService: TranslateService
  ) {
    super(
      msgDialogService,
      notificationService,
      capGroupService,
      loaderService,
      translateService
    );
  }

  ngOnInit() {
    this.gridData = { data: [], total: 0 };
    this.capGroupService.getCapUnits().subscribe((capUnits) => {
      this.gridData = { data: capUnits, total: capUnits.length };
    });
  }
}
