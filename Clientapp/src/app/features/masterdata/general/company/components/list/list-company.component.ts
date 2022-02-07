import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Company } from 'src/app/features/masterdata/general/company/models/company.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { CompanyService } from '../../services/company.service';
import { companies } from './sampledata';

@Component({
  selector: 'general-company',
  templateUrl: './list-company.component.html',
  styleUrls: ['../../../../../../styles/routed-component.css'],
})
export class CompanyComponent extends Crud<Company> implements OnInit {
  constructor(
    msgDialogService: MsgDialogService,
    notificationService: NotificationService,
    companyService: CompanyService
  ) {
    super(msgDialogService, notificationService, companyService);
  }

  ngOnInit() {
    this.gridData = { data: companies, total: companies.length };
  }
}
