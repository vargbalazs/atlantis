import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { CostAccountingType } from 'src/app/features/masterdata/planning/costacctype/models/costacctype.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { CostAccountingTypeService } from '../../services/costacctype.service';

@Component({
  selector: 'general-costacctype',
  templateUrl: './list-costacctype.component.html',
  styleUrls: ['../../../../../../styles/routed-component.css'],
})
export class CostAccountingTypeComponent
  extends Crud<CostAccountingType>
  implements OnInit
{
  constructor(
    msgDialogService: MsgDialogService,
    notificationService: NotificationService,
    private costacctypeService: CostAccountingTypeService,
    loaderService: LoaderService,
    translateService: TranslateService
  ) {
    super(
      msgDialogService,
      notificationService,
      costacctypeService,
      loaderService,
      translateService
    );
  }

  ngOnInit() {
    this.gridData = { data: [], total: 0 };
    this.costacctypeService.getCostAccTypes().subscribe((costAccTypes) => {
      this.gridData = { data: costAccTypes, total: costAccTypes.length };
    });
  }
}
