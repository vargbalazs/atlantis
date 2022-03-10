import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { CapType } from 'src/app/features/masterdata/production/captype/models/captype.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { CapTypeService } from '../../services/captype.service';
import { capTypes } from './sampledata';

@Component({
  selector: 'production-captype',
  templateUrl: './list-captype.component.html',
  styleUrls: ['../../../../../../styles/routed-component.css'],
})
export class CapTypeComponent extends Crud<CapType> implements OnInit {
  constructor(
    msgDialogService: MsgDialogService,
    notificationService: NotificationService,
    capGroupService: CapTypeService,
    loaderService: LoaderService
  ) {
    super(
      msgDialogService,
      notificationService,
      capGroupService,
      loaderService
    );
  }

  ngOnInit() {
    this.gridData = { data: capTypes, total: capTypes.length };
  }
}
