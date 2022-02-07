import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { CostAccountingType } from 'src/app/features/masterdata/planning/costacctype/models/costacctype.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { CostAccountingTypeService } from '../../services/costacctype.service';
import { costAccTypes } from './sampledata';

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
    costacctypeService: CostAccountingTypeService
  ) {
    super(msgDialogService, notificationService, costacctypeService);
  }

  ngOnInit() {
    this.gridData = { data: costAccTypes, total: costAccTypes.length };
  }
}
