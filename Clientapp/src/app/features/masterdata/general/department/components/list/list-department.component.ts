import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Department } from 'src/app/features/masterdata/general/department/models/department.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'general-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['../../../../../../styles/routed-component.css'],
})
export class DepartmentComponent extends Crud<Department> implements OnInit {
  constructor(
    msgDialogService: MsgDialogService,
    notificationService: NotificationService,
    private departmentService: DepartmentService,
    loaderService: LoaderService,
    translateService: TranslateService
  ) {
    super(
      msgDialogService,
      notificationService,
      departmentService,
      loaderService,
      translateService
    );
  }

  ngOnInit() {
    this.gridData = { data: [], total: 0 };
    this.departmentService.getDepartments().subscribe((depts) => {
      this.gridData = { data: depts, total: depts.length };
    });
  }
}
