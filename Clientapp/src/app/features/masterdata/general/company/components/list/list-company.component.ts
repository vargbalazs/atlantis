import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Company } from 'src/app/features/masterdata/general/company/models/company.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'general-company',
  templateUrl: './list-company.component.html',
  styleUrls: ['../../../../../../styles/routed-component.css'],
})
export class CompanyComponent extends Crud<Company> implements OnInit {
  constructor(
    msgDialogService: MsgDialogService,
    notificationService: NotificationService,
    private companyService: CompanyService,
    loaderService: LoaderService,
    translateService: TranslateService
  ) {
    super(
      msgDialogService,
      notificationService,
      companyService,
      loaderService,
      translateService
    );
  }

  ngOnInit() {
    this.gridData = { data: [], total: 0 };
    this.companyService.getCompanies().subscribe((companies) => {
      this.gridData = { data: companies, total: companies.length };
    });
  }
}
